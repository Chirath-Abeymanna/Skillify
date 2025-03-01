import { connect } from "http2";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/utils/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "profile email",
        },
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
      console.log("User Info:", user);
      try {
        await connectDB();

        // Ensure profile.name exists
        const fullName = profile?.name || "Unknown User"; // Fallback to avoid validation error
        const [firstName, ...lastNameParts] = fullName.split(" ");
        const lastName = lastNameParts.join(" ") || "";

        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          const user = await User.create({
            email: profile.email,
            firstName: firstName,
            lastName: lastName,
            avatar: "default",
            password: null,
          });
        }
        return true;
      } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        return false;
      }
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.image = token.picture;
      session.user.email = token.email;

      const sessionUser = await User.findOne({ email: session.user.email });

      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.id = user.id;
        token.picture = user.image;
        token.email = user.email;
      }
      return token;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
