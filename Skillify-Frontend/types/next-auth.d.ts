import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | null;
      firstName?: string | null;
      lastName?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      avatar?: string | null;
      provider?: string | null;
      reviews?: string[] | null;
      starNo?: number | null;
    };
  }
}
