import { POST } from "@/app/api/send-OTP/route";
import { NextRequest } from "next/server";
import { connectDB } from "@/utils/database";
import User from "@/models/User";

// Mock dependencies
jest.mock("@/utils/database");
jest.mock("@/models/User", () => ({
  findOne: jest.fn(),
}));
jest.mock("@/components/EmailTemplate", () => ({
  __esModule: true,
  default: ({ otp }: { otp: string }) =>
    `Mocked Email Template with OTP: ${otp}`,
}));

// Mock Resend
const mockSendEmail = jest.fn();
jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: async (options: any) => {
        const result = await mockSendEmail(options);
        return {
          data: result.data,
          error: result.error,
        };
      },
    },
  })),
}));

describe("Send OTP API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (connectDB as jest.Mock).mockResolvedValue(undefined);
    mockSendEmail.mockResolvedValue({
      data: {
        id: "mock_email_id",
        from: "test@example.com",
        to: "recipient@example.com",
      },
      error: null,
    });
  });

  test("should send OTP successfully", async () => {
    const mockUser = {
      email: "test@example.com",
      save: jest.fn().mockResolvedValue(true),
    };
    const mockOTP = "123456";

    (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);

    const request = new NextRequest("http://localhost:3000/api/send-OTP", {
      method: "POST",
      body: JSON.stringify({ email: mockUser.email, otp: mockOTP }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(mockUser.save).toHaveBeenCalled();
    expect(mockSendEmail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "Acme <onboarding@resend.dev>",
        to: "info.skillify.inc@gmail.com",
        subject: "Your OTP Code",
      })
    );
  });

  test("should handle user not found", async () => {
    (User.findOne as jest.Mock).mockResolvedValueOnce(null);

    const request = new NextRequest("http://localhost:3000/api/send-OTP", {
      method: "POST",
      body: JSON.stringify({ email: "nonexistent@example.com", otp: "123456" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.success).toBe(false);
  });

  test("should handle email sending failure", async () => {
    const mockUser = {
      email: "test@example.com",
      save: jest.fn(),
    };

    (User.findOne as jest.Mock).mockResolvedValueOnce(mockUser);
    mockSendEmail.mockResolvedValueOnce({
      data: null,
      error: { message: "Failed to send email" },
    });

    const request = new NextRequest("http://localhost:3000/api/send-OTP", {
      method: "POST",
      body: JSON.stringify({ email: mockUser.email, otp: "123456" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBeDefined();
  });
});
