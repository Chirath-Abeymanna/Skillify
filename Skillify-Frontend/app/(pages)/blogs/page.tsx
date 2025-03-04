import React from "react";

const articles = [
  {
    id: 1,
    title: "Roadmap",
    publishedDate: "03/01/2025",
    content:
      "sdgdsagdsadsfdfdsfadsfkl f afew ef tw fwefwf eew few fwfew gsae gsaweg awaeg awgawg awh awg er h ewrth oaith a h",
  },
  {
    id: 2,
    title: "Roadmap",
    publishedDate: "03/01/2025",
    content:
      "sdgdsagdsadsfdfdsfadsfkl f afew ef tw fwefwf eew few fwfew gsae gsaweg awaeg awgawg awh awg er h ewrth oaith a h",
  },
  {
    id: 3,
    title: "Roadmap",
    publishedDate: "25/12/2024",
    content:
      "sdgdsagdsadsfdfdsfadsfkl f afew ef tw fwefwf eew few fwfew gsae gsaweg awaeg awgawg awh awg er h ewrth oaith a h",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center p-6">
      <div className="w-full max-w-3xl flex items-center justify-center space-x-10 ">
        <div className="">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white p-6 mb-6 rounded-lg shadow-md border min-h-[70vh] max-w-[70vw]"
            >
              <h2 className="text-xl font-bold mb-2">{article.title}</h2>
              <p className="text-gray-500 text-sm mb-4">
                Published date: {article.publishedDate}
              </p>
              <div className="bg-gray-300 h-16 w-full mb-4"></div>
              <p className="text-gray-700">{article.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
