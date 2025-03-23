import { POST } from "@/app/api/create-payment-intent/route";
import { NextRequest } from "next/server";

// Mock environment variables
process.env.STRIPE_SECRET_KEY = "test_key";

// Mock Stripe
jest.mock("stripe", () => {
  const mockCreate = jest.fn().mockImplementation(({ amount }) => {
    if (!amount || typeof amount !== "number") {
      throw new Error("Amount is required and must be a number");
    }
    return Promise.resolve({
      id: "mock_id",
      client_secret: "mock_client_secret",
      status: "succeeded",
    });
  });

  return jest.fn().mockImplementation(() => ({
    paymentIntents: {
      create: mockCreate,
    },
  }));
});

describe("Payment Intent API", () => {
  let stripe: any;

  beforeEach(() => {
    jest.clearAllMocks();
    stripe = require("stripe")();
  });

  test("should create a payment intent successfully", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/create-payment-intent",
      {
        method: "POST",
        body: JSON.stringify({ amount: 1000 }),
      }
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ clientSecret: "mock_client_secret" });
    expect(stripe.paymentIntents.create).toHaveBeenCalledTimes(1);
    expect(stripe.paymentIntents.create).toHaveBeenCalledWith({
      amount: 1000,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
  });

  test("should handle invalid amount", async () => {
    const request = new NextRequest(
      "http://localhost:3000/api/create-payment-intent",
      {
        method: "POST",
        body: JSON.stringify({ amount: null }),
      }
    );

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Amount is required and must be a number");
  });
});
