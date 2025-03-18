"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// CAROUSEL DATA
interface DataType {
    time: string;
    heading: string;
    heading2: string;
    date: string;
    imgSrc: string;
    name: string;
    url: string;
}

const postData: DataType[] = [
    {
        time: "5 min",
        heading: "Dynamic Roadmaps by Skillify",
        heading2: "With Our Dynamic Roadmaps according to user preferences!",
        name: "Published on Skillify Blog",
        date: "December 18, 2024",
        imgSrc: "/images/blogs/blog1.jpg",
        url: "/blogs",
    },
    {
        time: "5 min",
        heading: "Skillify’s Job Seeker Feature",
        heading2: "Scan CVs and Scrape LinkedIn Profiles!",
        name: "Published on Skillify Blog",
        date: "December 18, 2024",
        imgSrc: "/images/blogs/blog2.jpg",
        url: "/blogs",
    },
    {
        time: "5 min",
        heading: "Salary Scope by Skillify",
        heading2: "Get Expert Guidance for Career Growth!",
        name: "Published on Skillify Blog",
        date: "December 18, 2024",
        imgSrc: "/images/blogs/blog3.png",
        url: "/blogs",
    },
    {
        time: "5 min",
        heading: "Skillify’s Degree Matching",
        heading2: "Find the Perfect Degree for Your Career!",
        name: "Published on Skillify Blog",
        date: "December 18, 2024",
        imgSrc: "/images/blogs/blog4.png",
        url: "/blogs",
    },
    {
        time: "5 min",
        heading: "Consultations at Skillify",
        heading2: "Tailor Your Learning Path with Skillify!",
        name: "Published on Skillify Blog",
        date: "December 18, 2024",
        imgSrc: "/images/blogs/blog5.jpg",
        url: "/blogs/5",
    },
];

const Card = ({ item }: { item: DataType }) => {
    return (
        <motion.div
            className="relative flex min-w-[300px] sm:min-w-[350px] md:min-w-[400px] flex-col rounded-xl bg-white shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            
        >
            <div className="relative h-56 overflow-hidden rounded-t-xl bg-gradient-to-r from-indigo-500 to-indigo-600">
                <Image
                    src={item.imgSrc}
                    alt={item.heading}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                />
            </div>
            <div className="p-6">
                <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">
                    {item.heading}
                </h5>
                <p className="text-base font-light">{item.heading2}</p>
            </div>
            <div className="p-6 pt-0">
                <Link href={item.url} passHref>
                    <button
                        type="button"
                        className="rounded-lg bg-indigo-500 py-3 px-6 text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-85 active:opacity-85 disabled:pointer-events-none disabled:opacity-50"
                    >
                        Read More
                    </button>
                </Link>
            </div>
        </motion.div>
    );
};

const BlogSection = () => {
    return (
        <div className="bg-lightgrey py-20 overflow-hidden" id="blog-section">
            <div className="mx-auto max-w-7xl sm:py-4 lg:px-8">
                <div className="text-center">
                    <h3 className="text-blue text-lg font-normal tracking-widest">
                        ARTICLES
                    </h3>
                    <h3 className="text-4xl sm:text-6xl font-bold">
                        Our latest updates.
                    </h3>
                </div>
                <div className="relative w-full py-8">
                    <div className="flex space-x-6 overflow-x-auto scroll-smooth scrollbar-hide custom-scrollbar">
                        {postData.map((item, i) => (
                            <Card key={i} item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogSection;
