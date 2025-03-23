import { POST } from "@/app/api/register/route";
import { NextRequest } from "next/server";
import { connectDB } from "@/utils/database";
import User from "@/models/User";

// Mock dependencies
jest.mock("@/utils/database");
jest.mock("@/models/User", () => {
  return {
    __esModule: true,
    default: {
      findOne: jest.fn(),
      create: jest.fn(),
    },
  };
});

describe("Register API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (connectDB as jest.Mock).mockResolvedValue(undefined);
  });

  test("should register a new user successfully", async () => {
    const mockUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "Password123!",
    };

    (User.findOne as jest.Mock).mockResolvedValueOnce(null);
    (User.create as jest.Mock).mockResolvedValueOnce(mockUser);

    const request = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(mockUser),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe("User registered successfully");
    expect(User.create).toHaveBeenCalledWith({
      ...mockUser,
      provider: "credentials",
    });
  });

  test("should return error for existing email", async () => {
    const mockUser = {
      firstName: "John",
      lastName: "Doe",
      email: "existing@example.com",
      password: "Password123!",
    };

    (User.findOne as jest.Mock).mockResolvedValueOnce({
      email: mockUser.email,
    });

    const request = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(mockUser),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("User already exists");
  });

  test("should return error for invalid data", async () => {
    const mockUser = {
      firstName: "",
      lastName: "Doe",
      email: "invalid-email",
      password: "123", // too short
    };

    const request = new NextRequest("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(mockUser),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
  });
});
