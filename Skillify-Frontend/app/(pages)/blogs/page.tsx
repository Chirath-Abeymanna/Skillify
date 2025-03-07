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

  // Refs for scrolling
  const articleRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    setArticles([
      {
        id: 1,
        title: "Mastering Web Development",
        publishedDate: "03/01/2025",
        content:
          "Learn the best practices for modern web development with Next.js and TailwindCSS.",
        image: "/images/blogs/blog1.jpg",
        category: "Web Development",
      },
      {
        id: 2,
        title: "Job Seeker",
        publishedDate: "03/01/2025",
        content: "A complete guide to becoming a full-stack developer in 2025.",
        image: "/images/blog2.jpg",
        category: "Job Seeker",
      },
      {
        id: 3,
        title: "AI & Machine Learning Trends",
        publishedDate: "25/12/2024",
        content:
          "Explore the future of AI and machine learning technologies in the coming years.",
        image: "/images/blog3.jpg",
        category: "AI & Machine Learning",
      },
      {
        id: 4,
        title: "Cybersecurity Tips for 2025",
        publishedDate: "01/03/2025",
        content: "Stay safe online with these cybersecurity best practices.",
        image: "/images/blogs/blog4.png",
        category: "Cybersecurity",
      },
      {
        id: 5,
        title: "Career Path Consultations",
        publishedDate: "05/02/2025",
        content:
          "Discover the latest trends in cloud computing and how businesses are leveraging the cloud for scalability and security.",
        image: "/images/blogs/blog5.jpg",
        category: "Cloud Computing",
      },
    ]);
  }, []);

  // Scroll to the article when a category is clicked
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
    <div className="min-h-screen bg-white p-6 flex justify-center mb-[12rem]">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Blog Articles Section */}
        <div className="md:col-span-2">
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
                width={300}
                height={200}
                className="rounded-lg w-full h-52 object-cover"
              />
              <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                📅 Published Date: {article.publishedDate}
              </p>
              <p className="text-gray-700">{article.content}</p>

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
        <div className="p-6 rounded-lg shadow-lg border fixed right-20 top-[25vh]">
          <h3 className="mt-6 text-lg font-semibold text-gray-800">
            Categories
          </h3>
          <Image
            src="/images/blogs/blog6.png"
            alt="Categories"
            width={250}
            height={150}
            className="rounded-lg my-4"
          />
          <ul className="mt-2 text-btnblue space-y-2">
            {Array.from(new Set(articles.map((a) => a.category))).map(
              (category) => (
                <li
                  key={category}
                  className="hover:text-blue-500 cursor-pointer"
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
  );
}
