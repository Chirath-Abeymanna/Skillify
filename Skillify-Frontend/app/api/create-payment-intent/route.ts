import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  // <-- Use 'POST' instead of 'post'
  try {
    const { amount } = await request.json(); // Extract amount from the request body

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret }); // Return the client secret
  } catch (error: any) {
    console.error("Internal Error: ", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
