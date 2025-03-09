//

"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "./Button";
import { ChatGPTMessage, ChatLine, LoadingChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";

const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

export const initialMessages: ChatGPTMessage[] = [
  {
    role: "assistant",
    content: "Hi! I am Sally. \n\n How can I help you?",
  },
];

const InputMessage: React.FC<{
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message: string) => void;
}> = ({ input, setInput, sendMessage }) => (
  <div className="absolute bottom-4 left-1/2 w-full max-w-3xl -translate-x-1/2 flex items-center bg-white p-3 rounded-lg shadow-lg">
    <input
      type="text"
      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={input}
      placeholder="Type a message..."
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => setInput(e.target.value)}
    />
    <Button className="ml-3 px-5 py-2" onClick={() => sendMessage(input)}>
      Send
    </Button>
  </div>
);

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      setCookie(COOKIE_NAME, Math.random().toString(36).substring(7));
    }
  }, [cookie, setCookie]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setLoading(true);
    const newMessages: ChatGPTMessage[] = [
      ...messages,
      { role: "user" as const, content: message },
    ];
    setMessages(newMessages);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: newMessages.slice(-10),
        user: cookie[COOKIE_NAME],
      }),
    });

    if (!response.ok) return setLoading(false);

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let lastMessage = "";

    while (true) {
      const { value, done } = await reader!.read();
      if (done) break;
      lastMessage += decoder.decode(value);
    }

    setMessages([...newMessages, { role: "assistant", content: lastMessage }]);
    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-gray-50">
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-5 flex flex-col-reverse space-y-2 pb-24">
        {/* AI Loading Indicator at the Top */}
        {loading && (
          <div className="self-start">
            <LoadingChatLine />
          </div>
        )}

        {/* Render Messages from Bottom to Top */}
        {[...messages].reverse().map(({ content, role }, index) => (
          <div
            key={index}
            className={`max-w-md px-4 py-3 rounded-lg shadow-md ${
              role === "assistant"
                ? "bg-gray-200 text-gray-900 self-start"
                : "bg-blue-500 text-white self-end"
            }`}
          >
            <span className="font-semibold">
              {role === "assistant" ? "Sally" : "You"}
            </span>
            <p className="mt-1">{content}</p>
          </div>
        ))}

        {/* Dummy div to maintain scroll behavior */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
};
