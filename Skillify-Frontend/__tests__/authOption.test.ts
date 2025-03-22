import { authOptions } from "@/app/api/auth/authOptions";
import NextAuth from "next-auth";
import type { CredentialsProvider } from "next-auth/providers/credentials";
import { connectDB } from "@/utils/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";

jest.mock("@/utils/database");
jest.mock("@/models/User", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));
jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

describe("NextAuth authOptions", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

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
      firstName: "Test",
      lastName: "User",
      provider: "social",
      avatar: "default",
      reviews: [],
      starNo: 0,
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
    (User.findOne as jest.Mock).mockResolvedValueOnce(null);

    const profile = {
      name: "New User",
      given_name: "New",
      family_name: "User",
      email: "newuser@gmail.com",
    };

    const expectedUserData = {
      firstName: profile.given_name,
      lastName: profile.family_name,
      email: profile.email,
      avatar: "default",
      provider: "social",
      reviews: [],
      starNo: 0,
    };

    (User.create as jest.Mock).mockResolvedValueOnce({
      id: "456",
      ...expectedUserData,
    });

    const result = await authOptions.callbacks?.signIn?.({
      user: {
        id: "temp-id",
        email: profile.email,
        emailVerified: null,
      },
      account: {
        provider: "linkedin",
        providerAccountId: "temp-id",
        type: "oauth",
      },
      profile,
    });

    expect(User.create).toHaveBeenCalledWith(expectedUserData);
    expect(result).toBe(true);
  });

  test("should return null for invalid credentials", async () => {
    (User.findOne as jest.Mock).mockResolvedValueOnce(null);

    const credentialsProvider = authOptions.providers[2] as unknown as {
      authorize: Function;
    };
    const invalidUser = await credentialsProvider.authorize({
      email: "fakeuser@test.com",
      password: "wrongPassword",
    });

    expect(invalidUser).toBe(null);
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
