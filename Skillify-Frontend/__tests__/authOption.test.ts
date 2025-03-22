import { authOptions } from "@/app/api/auth/authOptions";
import NextAuth from "next-auth";
import type { CredentialsProvider } from "next-auth/providers/credentials";
import { connectDB } from "@/utils/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { PassThrough } from "stream";

jest.mock("@/utils/database");
jest.mock("@/models/User");
jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

describe("NextAuth authOptions", () => {
  beforeAll(() => {
    (connectDB as jest.Mock).mockResolvedValue(true);
  });

  test("should configure providers correctly", () => {
    expect(authOptions.providers).toBeDefined();
    expect(authOptions.providers).toHaveLength(3); // Google, LinkedIn, Credentials
  });

  test("should return true on valid social login (Google or LinkedIn)", async () => {
    const testUser = {
      id: "123",
      email: "testuser@gmail.com",
      password: "hashedPassword",
      firstName: "Test",
      lastName: "User",
      provider: "social",
      avatar: "default",
      roadmaps: [],
    };

    (User.findOne as jest.Mock).mockResolvedValue(testUser);

    const isSignedIn =
      (await authOptions.callbacks?.signIn?.({
        user: { id: "123", email: "testuser@gmail.com", emailVerified: null },
        account: {
          provider: "google",
          providerAccountId: "12345",
          type: "oauth",
        },
        profile: { name: "Test User", email: "testuser@gmail.com" },
      })) ?? false;

    expect(isSignedIn).toBe(true);
  });

  test("should handle user creation if social user does not exist", async () => {
    (User.findOne as jest.Mock).mockResolvedValueOnce(null); // No user in DB
    const testUser = {
      email: "newuser@gmail.com",
      firstName: "New",
      password: "hashedPassword",
      lastName: "User",
      avatar: "default",
      provider: "social",
      reviews: [],
      starNo: 0,
    };
    (User.create as jest.Mock).mockResolvedValueOnce({
      id: "456",
      ...testUser,
    });

    const result = await authOptions.callbacks?.signIn?.({
      user: { id: "temp-id", email: "newuser@gmail.com", emailVerified: null },
      account: {
        provider: "linkedin",
        providerAccountId: "temp-id",
        type: "oauth",
      },
      profile: { name: "New User", email: "newuser@gmail.com" },
    });

    expect(User.create).toHaveBeenCalledWith({
      firstName: "New",
      lastName: "User",
      password: "hashedPassword",
      email: "newuser@gmail.com",
      avatar: "default",
      provider: "social",
      reviews: [],
      starNo: 0,
    });
    expect(result).toBe(true);
  });

  test("should add user info to token in JWT callback", async () => {
    const token = await authOptions.callbacks?.jwt?.({
      token: {},
      user: { id: "123", email: "testuser@gmail.com" },
      account: {
        provider: "google",
        providerAccountId: "12345",
        type: "oauth",
      },
    });

    expect(token).toMatchObject({
      id: "123",
      email: "testuser@gmail.com",
    });
  });
});
