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
  <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-lg px-4">
    <div className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-lg border border-gray-300">
      <input
        type="text"
        aria-label="chat input"
        required
        className="flex-grow appearance-none border-none focus:outline-none px-3 py-2 text-gray-900"
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
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => {
          sendMessage(input);
          setInput("");
        }}
      >
        Send
      </Button>
    </div>
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
    <div className="relative mx-auto max-w-lg h-screen flex flex-col-reverse overflow-y-auto p-4">
      <div className="flex flex-col-reverse space-y-4 pb-20">
        {messages.map(({ content, role }, index) => (
          <div
            key={index}
            className={`p-4 rounded-xl shadow-md mb-2 max-w-xs transition transform hover:scale-105 hover:shadow-lg
              ${
                role === "assistant"
                  ? "self-start bg-gray-100 text-gray-900"
                  : "self-end bg-blue-500 text-white"
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
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
};
