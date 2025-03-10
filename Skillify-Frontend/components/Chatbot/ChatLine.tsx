import clsx from "clsx";
import Balancer from "react-wrap-balancer";
import HouseCard from "./HouseCard";

const BalancerWrapper = (props: any) => <Balancer {...props} />;

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

const findHouse = (text: string) => {
  const regex = /(Ravenclaw|Hufflepuff|Gryffindor|Slytherin)/;
  const matches = text.match(regex);
  if (matches && matches.length > 0) {
    return matches[0];
  }
  return null;
};

export function ChatLine({ role = "assistant", content }: ChatGPTMessage) {
  if (!content) {
    return null;
  }
  const formatteMessage = convertNewLines(content);
  const hogwartzHouse = findHouse(content);

  return (
    <div
      className={
        role !== "assistant"
          ? "float-right clear-both"
          : "float-left clear-both"
      }
    >
      <div className="relative mx-auto max-w-md rounded-lg bg-gradient-to-tr from-pink-300 to-blue-300 p-0.5 shadow-lg transition transform hover:scale-105 hover:bg-opacity-90">
        <div className="bg-white p-7 rounded-md">
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
              <p className="font-large text-sm text-zinc-400 font-semibold mb-2">
                {role === "assistant" ? "AI" : "You"}
              </p>
              <p className="text font-normal">{formatteMessage}</p>
              {hogwartzHouse && role === "assistant" && (
                <HouseCard house={hogwartzHouse} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
