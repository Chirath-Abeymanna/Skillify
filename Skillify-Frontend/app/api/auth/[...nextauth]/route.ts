import NextAuth, { AuthOptions } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions"; // Move authOptions to a separate file

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
