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
          "🚀 Not sure which career path to choose? Our Career Map is here to guide you!\n \nA Career Map is a structured guide that helps you navigate different job roles, required skills, and growth opportunities. It provides a visual representation of career progression in various industries, helping you set long-term goals and take strategic steps in your professional journey.\n \nWhether you're a student deciding on a future career or a professional considering a switch, our Career Map outlines clear steps to success. It includes details on education requirements, essential skills, and industry trends to keep you on the right track. Stay ahead by planning your future with confidence!",
        image: "/images/blogs/blog1.svg",
        category: "Career Map",
      },
      {
        id: 2,
        title: "Job Seeker",
        publishedDate: "03/01/2025",
        content:
          "💼 Looking for a job? Our Job Seeker platform makes job searching easier than ever!\n \nFinding the right job can be stressful and time-consuming. With our smart system, you can simply upload your CV, and we’ll do the rest! Our AI-powered tool analyzes your skills, experience, and preferences to match you with the best career opportunities.\n\nInstead of spending hours scrolling through job listings, let our system suggest tailored job openings that fit your qualifications. Whether you’re a fresh graduate or an experienced professional, our platform helps you land your dream job efficiently and hassle-free.",
        image: "/images/blogs/blog2.svg",
        category: "Job Seeker",
      },
      {
        id: 3,
        title: "Salary Predictor",
        publishedDate: "25/12/2024",
        content:
          "🤖 Curious about your potential salary? Our Salary Predictor provides accurate estimates based on real market data!\n \nSalaries vary depending on your job title, industry, location, and experience level. Our AI-driven Salary Predictor helps you understand what you should be earning. Simply enter your job role, experience, and location, and our system will generate a salary range based on industry standards and trends.\n \nWhether you're negotiating a raise, considering a career change, or just curious about your earning potential, our tool provides valuable insights. Get the compensation you deserve by making informed salary decisions!",
        image: "/images/blogs/blog3.svg",
        category: "Salary Predictor",
      },
      {
        id: 4,
        title: "Degree Matcher",
        publishedDate: "01/03/2025",
        content:
          "🎓 Confused about which degree to pursue? Our Degree Matcher simplifies the decision-making process!\n \nSelecting the right degree is crucial for your future career. Our tool helps you identify the best IT-related degrees in Sri Lanka based on your A/L subject selections and university preferences. Instead of making random choices, get tailored recommendations that align with your academic strengths and career aspirations.\n \nWith Degree Matcher, you can explore university options, compare different programs, and make an informed decision about your higher education. Ensure your studies lead to a successful career by choosing the degree that best fits your goals!",
        image: "/images/blogs/blog4.svg",
        category: "Degree Matcher",
      },
      {
        id: 5,
        title: "Consultations",
        publishedDate: "01/03/2025",
        content:
          "📢 Need career guidance? Our Career Path Consultation service connects you with experts who can help!\n \nUnderstanding the job market and planning your career path can be overwhelming. Our career consultants provide personalized guidance on career choices, skill development, and industry trends to help you navigate your professional journey with confidence.\n \nWhether you need advice on job applications, resume building, or upskilling, our experts will help you make informed decisions. Take charge of your future by getting the right advice at the right time and stay ahead in the competitive job market!",
        image: "/images/blogs/blog5.svg",
        category: "Consultations",
      },
      {
        id: 6,
        title: "Work Style Matcher",
        publishedDate: "01/03/2025",
        content:
          "🔍 ",
        image: "/images/blogs/blog6.svg",
        category: "Interview Prep",
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
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blog Articles Section */}
        <div className="col-span-2">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            🚀 Latest Blogs
          </h1>
          {articles.map((article) => (
            <div
              key={article.id}
              ref={(el) => (articleRefs.current[article.id] = el)}
              className="mb-6 p-6 rounded-lg shadow-lg border transition duration-300 hover:shadow-xl"
            >
              <Image
                src={article.image}
                alt={article.title}
                width={150}
                height={150}
                className="rounded-lg w-full object-cover"
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
        {/* Sidebar Section */}
        <div className="relative">
          <div className="bg-white p-6 rounded-lg shadow-lg border sticky top-20">
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
