"use client";
import MessageBox from "@/components/MessageBox";
import { useState } from "react";

export default function PaymentPage() {
  const [messages, setMessages] = useState<
    { message: string; type: "success" | "info" | "warning" | "error" }[]
  >([]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      {messages.map((msg, index) => (
        <MessageBox key={index} message={msg.message} type={msg.type} />
      ))}
      <h1 className="text-2xl font-bold">Hello World</h1>
    </div>
  );
}
