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
  <div className="absolute bottom-8 left-1/2 w-full max-w-3xl -translate-x-1/2 flex items-center bg-white bg-opacity-90 p-4 rounded-lg shadow-lg">
    <input
      type="text"
      className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
    <Button className="ml-4 px-6 py-3" onClick={() => sendMessage(input)}>
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
    <div className="relative w-full h-full flex flex-col bg-transparent">
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {/* Message List */}
        <div className="space-y-6">
          {messages.map(({ content, role }, index) => (
            <div
              key={index}
              className={`flex ${
                role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] px-5 py-4 rounded-xl shadow-lg ${
                  role === "assistant"
                    ? "bg-gray-200 text-gray-900"
                    : "bg-blue-600 text-white"
                }`}
              >
                <span className="font-semibold">
                  {role === "assistant" ? "Sally" : "You"}
                </span>
                <p className="mt-2 whitespace-pre-wrap">{content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <LoadingChatLine />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Box - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};
