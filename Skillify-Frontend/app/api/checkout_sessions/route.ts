import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('your-stripe-secret-key', {
  apiVersion: '2025-02-24.acacia',
});

export async function POST() {
    try {
      const headersList = await headers();
      const origin = headersList.get("origin");
  
      // Define the amount dynamically (cents format: 500 = $5.00)
      const amount = 500; // Example: $5.00
      const currency = "usd"; // Change as needed (e.g., "eur", "gbp")
  
      // Create Checkout Sessions with a custom amount
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: currency,
              product_data: {
                name: "Custom Payment",
              },
              unit_amount: amount, // Amount in cents (500 = $5.00)
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`,
      });
  
      if (session.url) {
        return NextResponse.redirect(session.url, 303);
      } else {
        throw new Error("Session URL is null");
      }
    } catch (err) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
  