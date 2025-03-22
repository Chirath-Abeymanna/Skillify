"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import * as z from "zod";
import MessageBox from "@/components/MessageBox";
import CheckoutPage from "@/components/CheckoutPage/CheckOutPage";
import convertToSubcurrency from "@/app/lib/convertToSubcurrency";

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Card number is too long")
    .regex(/^\d{16,19}$/, "Card number must contain only digits"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, "Invalid expiry date (MM/YY)")
    .refine((val) => {
      const [month, year] = val.split("/");
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      if (
        parseInt(year) < currentYear ||
        (parseInt(year) === currentYear && parseInt(month) < currentMonth)
      ) {
        return false;
      }
      return true;
    }, "Expiry date cannot be in the past"),
  cvv: z
    .string()
    .length(3, "CVV must be 3 digits")
    .regex(/^\d{3}$/, "CVV must contain only digits"),
  orderNumber: z
    .string()
    .min(12, "Order number must be at least 12 characters")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Order number must contain only alphanumeric characters"
    ),
});

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function PaymentForm() {
  const [errors, setErrors] = useState<z.ZodFormattedError<{
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    orderNumber: string;
  }>>({
    _errors: [],
    cardNumber: { _errors: [] },
    expiryDate: { _errors: [] },
    cvv: { _errors: [] },
    orderNumber: { _errors: [] },
  });

  const [amount, setAmount] = useState(5.0);
  const [orderNumber] = useState("ORD123456789");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const [messages, setMessages] = useState<
    { message: string; type: "success" | "info" | "warning" | "error" }[]
  >([]);

  const handleCancel = () => {
    // Clear form data
    setCardNumber("");
    setExpiryDate("");
    setCvv("");
    // Add a message
    setMessages([{ message: "Payment cancelled", type: "info" }]);
  };

  const handlePay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const data = {
      cardNumber: cardNumber.replace(/\s/g, ""),
      expiryDate,
      cvv,
      orderNumber,
    };
    const result = paymentSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.format());
      setMessages([{ message: "Payment failed", type: "error" }]);
      return;
    }
    setErrors({
      _errors: [],
      cardNumber: { _errors: [] },
      expiryDate: { _errors: [] },
      cvv: { _errors: [] },
      orderNumber: { _errors: [] },
    });
    // Process payment
    setMessages([{ message: "Payment successful!", type: "success" }]);
    console.log("Payment Data:", data);
  };

  function validateForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = {
      cardNumber: cardNumber.replace(/\s/g, ""), // Remove spaces before validation
      expiryDate,
      cvv,
      orderNumber,
    };
    const result = paymentSchema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }
    setErrors({
      _errors: [],
      cardNumber: { _errors: [] },
      expiryDate: { _errors: [] },
      cvv: { _errors: [] },
      orderNumber: { _errors: [] },
    });
    console.log("Payment Data:", data);
  }

  function handleCardNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    value = value.slice(0, 16); // Limit to 16 digits

    // Automatically format with spaces every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, "$1 "); // Add spaces after every 4 digits
    setCardNumber(value); // Update the card number state
  }

  function handleExpiryDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4); // Add '/' after the second digit
    }
    if (value.length > 5) {
      value = value.slice(0, 5); // Limit the length to "MM/YY"
    }
    setExpiryDate(value); // Update the expiry date state
  }

  function handleCvvChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (value.length > 3) {
      value = value.slice(0, 3); // Limit to 3 digits
    }
    setCvv(value); // Update the CVV state
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg.message} type={msg.type} />
      ))}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex">
        {/* Left Section */}
        <div className="w-1/3 p-6 bg-blue-50 rounded-l-lg">
          <h2 className="text-2xl font-bold text-[#376CB1] mb-2">
            Skillify <br /> payment
          </h2>
          <div className="mt-6 space-y-6 text-sm">
            <div className="flex justify-start items-center">
              <p className="font-medium mr-4">
                <strong>Merchant name:</strong>
              </p>
              <p className="text-gray-600">Skillify</p>
            </div>
            <div className="flex justify-start items-center">
              <p className="font-medium mr-4">
                <strong>E-commerce Website:</strong>
              </p>
              <p className="text-gray-600">www.skillify.solutions</p>
            </div>
          </div>

          {/* Total Amount Section */}
          <div className="mt-6 bg-[#D8E4F9] p-4 rounded-lg">
            <div className="flex flex-col items-center">
              <p className="text-sm text-gray-600">TOTAL AMOUNT DUE</p>
              <p
                className="text-2xl font-semibold"
                style={{ color: "#283EB8" }}
              >
                ${amount}
              </p>
            </div>
          </div>

          {/* Personal Data Encryption Text and Logos */}
          <div className="mt-24 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/images/payment/secure.png"
                alt="Secure Logo"
                className="w-6 h-6"
              />
              <p className="text-xs text-[#28B873]">
                All your personal data is encrypted and secured
              </p>
            </div>
            <div className="flex items-center space-x-8">
              <img
                src="/images/payment/mastercard.png"
                alt="Mastercard"
                className="w-10"
              />
              <img
                src="/images/payment/visa.png"
                alt="Verified by Visa"
                className="w-16"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 p-8">
          <h2 className="text-xl font-semibold mb-4">Your card information</h2>

          {/* Visa Card Representation */}
          <div className="flex space-x-6">
            {/* Front of the Card */}
            <div className="relative w-full max-w-sm h-40 bg-gradient-to-r from-[#1A1F71] to-[#0097F4] rounded-lg p-6 text-white shadow-lg">
              <p className="absolute top-4 left-6 text-xs text-gray-200">
                Card number
              </p>
              <p className="text-lg font-semibold tracking-wider mt-3">
                {cardNumber
                  ? cardNumber.replace(/\d{4}(?=\d)/g, "$& ")
                  : "**** **** **** ****"}
              </p>
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={validateForm} className="mt-6">
            {/* Card Number */}
            <div className="mb-6">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-[#283EB8]"
              >
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                maxLength={19}
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1949E9]"
                placeholder="Enter your card number"
              />
              {errors.cardNumber && errors.cardNumber._errors.length > 0 && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.cardNumber._errors[0]}
                </p>
              )}
            </div>

            {/* Expiry Date */}
            <div className="mb-6">
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-[#283EB8]"
              >
                Expiry Date (MM/YY)
              </label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                maxLength={5}
                value={expiryDate}
                onChange={handleExpiryDateChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1949E9]"
                placeholder="MM/YY"
              />
              {errors.expiryDate && errors.expiryDate._errors.length > 0 && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.expiryDate._errors[0]}
                </p>
              )}
            </div>

            {/* CVV */}
            <div className="mb-6">
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-[#283EB8]"
              >
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                maxLength={3}
                value={cvv}
                onChange={handleCvvChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1949E9]"
                placeholder="Enter CVV"
              />
              {errors.cvv && errors.cvv._errors.length > 0 && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.cvv._errors[0]}
                </p>
              )}
            </div>

            {/* Order Number */}
            <div className="mb-6">
              <label
                htmlFor="orderNumber"
                className="block text-sm font-medium text-[#283EB8]"
              >
                Order Number
              </label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={orderNumber}
                readOnly
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1949E9]"
              />
            </div>

            {/* Submit Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handlePay}
                className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Pay Now
              </button>
            </div>

            {/* Cancel Button */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleCancel}
                className="w-full py-3 text-white font-semibold bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
