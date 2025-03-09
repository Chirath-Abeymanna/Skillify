"use client";

import { useEffect, useState } from "react";
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

interface InputMessageProps {
  input: string;
  setInput: (value: string) => void;
  sendMessage: (message: string) => void;
}

const InputMessage: React.FC<InputMessageProps> = ({
  input,
  setInput,
  sendMessage,
}) => (
  <div className="mt-3 flex clear-both">
    <input
      type="text"
      aria-label="chat input"
      required
      className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 sm:text-sm text-zinc-900"
      value={input}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          sendMessage(input);
          setInput("");
        }
      }}
      onChange={(e) => setInput(e.target.value)}
    />
    <Button
      type="submit"
      className="ml-2 w-32 h-12 flex-none"
      onClick={() => {
        sendMessage(input);
        setInput("");
      }}
    >
      Send
    </Button>
  </div>
);

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages: ChatGPTMessage[] = [
      ...messages,
      { role: "user", content: message },
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

    if (!response.ok) throw new Error(response.statusText);

    const data = response.body;
    if (!data) return setLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let lastMessage = "";
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      lastMessage += decoder.decode(value);
    }

    setMessages([...newMessages, { role: "assistant", content: lastMessage }]);
    setLoading(false);
  };

  return (
    <div className="relative mx-auto max-w-md rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg">
      <div className="bg-white p-7 rounded-md">
        <div className="flex flex-col space-y-4">
          {messages.map(({ content, role }, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl shadow-md mb-4 transition transform hover:scale-105 hover:bg-opacity-90 hover:shadow-lg ${
                role === "assistant"
                  ? "bg-gray-100 text-gray-900 self-start"
                  : "bg-blue-100 text-gray-900 self-end"
              }`}
            >
              <span className="font-semibold">
                {role === "assistant" ? "Sally" : "You"}
              </span>
              <p className="mt-1">{content}</p>
            </div>
          ))}
        </div>
        {loading && <LoadingChatLine />}
        {messages.length < 2 && (
          <span className="mx-auto flex flex-grow text-gray-400 clear-both">
            Type a message to start the conversation
          </span>
        )}
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};
