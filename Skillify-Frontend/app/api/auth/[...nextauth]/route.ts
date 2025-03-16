import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import LinkedInProvider from "next-auth/providers/linkedin";
import { connectDB } from "@/utils/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { scope: "profile email" },
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          response_type: "code",
          scope: "r_liteprofile r_emailaddress", // ✅ Corrected scope
        },
      },
      token: "https://www.linkedin.com/oauth/v2/accessToken",
      userinfo: {
        async request({ tokens }) {
          const profileRes = await fetch("https://api.linkedin.com/v2/me", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
          });
          const emailRes = await fetch(
            "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
            {
              headers: { Authorization: `Bearer ${tokens.access_token}` },
            }
          );

          const profile = await profileRes.json();
          const emailData = await emailRes.json();

          return {
            id: profile.id,
            firstName: profile.localizedFirstName,
            lastName: profile.localizedLastName,
            email: emailData.elements?.[0]?.["handle~"]?.emailAddress || null,
          };
        },
      },
      checks: ["state"], // ✅ Avoids issuer validation error
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const isValidPassword = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Incorrect password");
        }

        return {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          provider: user.provider,
          avatar: user.avatar,
          roadmaps: user.roadmaps,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({
      user,
      account,
      profile,
    }: {
      user: any;
      account: any;
      profile?: any;
    }) {
      await connectDB();

      if (account?.provider === "google" || account?.provider === "linkedin") {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            firstName: profile?.given_name || profile?.localizedFirstName,
            lastName: profile?.family_name || profile?.localizedLastName,
            email: user.email, // ✅ Ensure we save the correct email
            avatar: "default",
            provider: "social",
            reviews: [],
            starNo: 0,
          });
        }

        const fetchedUser = await User.findOne({ email: user.email });
        user.id = fetchedUser._id;
        user.firstName = fetchedUser.firstName;
        user.lastName = fetchedUser.lastName;
        user.provider = fetchedUser.provider;
        user.avatar = fetchedUser.avatar || "default";
        user.roadmaps = fetchedUser.roadmaps;
      }

      return true;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.provider = user.provider;
        token.avatar = user.avatar;
        token.roadmaps = user.roadmaps;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.avatar = token.avatar || "default";
      session.user.email = token.email;
      session.user.lastName = token.lastName;
      session.user.provider = token.provider;
      session.user.firstName = token.firstName;
      session.user.roadmaps = token.roadmaps;

      const sessionUser = await User.findOne({ email: session.user.email });

      if (sessionUser) {
        session.user.firstName = sessionUser.firstName;
        session.user.lastName = sessionUser.lastName;
      }

      return session;
    },
  },
  secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
