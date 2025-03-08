"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Article {
  id: number;
  title: string;
  publishedDate: string;
  content: string;
  image: string;
  category: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const articleRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    setArticles([
      {
        id: 1,
        title: "Career Map",
        publishedDate: "03/01/2025",
        content:
          "🚀 Not sure which career path to choose? Our Career Map is here to guide you!\n\nDiscover different job roles, the skills you need, and how to progress in your chosen field. Whether you're a student or a professional looking to switch careers, this roadmap will help you navigate the journey with confidence!",
        image: "/images/blogs/blog1.jpg",
        category: "Career Map",
      },
      {
        id: 2,
        title: "Job Seeker",
        publishedDate: "03/01/2025",
        content:
          "💼 Tired of endlessly searching for jobs? Let Skillify do the work for you!\n\nSimply upload your CV, and our smart system will analyze your resume and match you with the best career opportunities. No more wasting time—just upload, process, and start your dream job search instantly! 🚀",
        image: "/images/blogs/blog2.jpg",
        category: "Job Seeker",
      },
      {
        id: 3,
        title: "AI & Machine Learning Trends",
        publishedDate: "25/12/2024",
        content:
          "🤖 Artificial Intelligence is reshaping the world!\n\nExplore the latest trends in AI and Machine Learning, from cutting-edge algorithms to real-world applications. Learn how AI is transforming industries, automating tasks, and paving the way for an innovative future!",
        image: "/images/blog3.jpg",
        category: "AI & Machine Learning",
      },
      {
        id: 4,
        title: "Degree Matcher",
        publishedDate: "01/03/2025",
        content:
          "🎓 Confused about which degree to choose?\n\nOur Degree Matcher helps you find the best IT-related degrees in Sri Lanka based on your A/L subject selections and university preferences. No more guesswork—just a perfect match for your future!",
        image: "/images/blogs/blog4.png",
        category: "Degree Matcher",
      },
      {
        id: 5,
        title: "Career Path Consultations",
        publishedDate: "05/02/2025",
        content:
          "📢 Need expert advice on your career?\n\nOur career consultants are here to help! Get personalized guidance on job market trends, skill development, and career opportunities.\n \nTake charge of your future with the right advice at the right time!",
        image: "/images/blogs/blog5.jpg",
        category: "Career Path Consultations",
      },
    ]);
  }, []);

  const scrollToCategory = (category: string) => {
    const targetArticle = articles.find(
      (article) => article.category === category
    );
    if (targetArticle && articleRefs.current[targetArticle.id]) {
      articleRefs.current[targetArticle.id]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 flex justify-center overflow-x-hidden">
      <div className="max-w-6xl w-full grid grid-cols-3 gap-6">
        {/* Blog Articles Section */}
        <div className="col-span-2 min-w-[700px]">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            🚀 Latest Blogs
          </h1>

          {articles.map((article) => (
            <div
              key={article.id}
              ref={(el) => (articleRefs.current[article.id] = el)}
              className="mb-6 p-6 rounded-lg shadow-lg border transition duration-300 hover:shadow-xl min-w-[300px]"
            >
              <Image
                src={article.image}
                alt={article.title}
                width={200}
                height={200}
                className="rounded-lg w-screen h-auto object-cover"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                📅 Published Date: {article.publishedDate}
              </p>
              <p className="text-gray-700 whitespace-pre-line">
                {article.content}
              </p>

              {/* Featured Author */}
              <div className="flex items-center mt-6">
                <div className="ml-4">
                  <p className="font-semibold">Nadini Salisha</p>
                  <p className="text-sm text-gray-500">Tech Blogger</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Section (Sticky Sidebar) */}
        <div className="relative">
          <div className="bg-white p-6 rounded-lg shadow-lg border min-w-[300px] fixed right-24 top-56">
            <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
            <Image
              src="/images/blogs/blog6.png"
              alt="Categories"
              width={250}
              height={150}
              className="rounded-lg my-6"
            />
            <ul className="mt-2 space-y-2">
              {Array.from(new Set(articles.map((a) => a.category))).map(
                (category) => (
                  <li
                    key={category}
                    className="cursor-pointer bg-indigo-300 p-3 rounded-lg text-center text-gray-700 font-medium transition duration-300 hover:bg-indigo-700 hover:text-white"
                    onClick={() => scrollToCategory(category)}
                  >
                    {category}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
