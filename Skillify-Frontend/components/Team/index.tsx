"use client";
import Slider from "react-slick";
import React, { Component } from "react";
import Image from "next/image";
import Link from "next/link";

// CAROUSEL DATA

interface DataType {
  profession: string;
  name: string;
  imgSrc: string;
}

const postData: DataType[] = [
  {
    profession: "Co-founder",
    name: "Chamodya Chirath",
    imgSrc: "/images/wework/avatar4.svg",
  },
  {
    profession: "Co-founder",
    name: "Dev Ranasinghe",
    imgSrc: "/images/wework/avatar.svg",
  },
  {
    profession: "Co-founder",
    name: "Renal Perera",
    imgSrc: "/images/wework/avatar4.svg",
  },
  {
    profession: "Co-founder",
    name: "Onel Silva",
    imgSrc: "/images/wework/avatar3.svg",
  },
  {
    profession: "Co-founder",
    name: "Nadini Salisha",
    imgSrc: "/images/wework/avatar.svg",
  },
  {
    profession: "Co-founder",
    name: "Sehansa Dilsadi",
    imgSrc: "/images/wework/avatar3.svg",
  },
];

// CAROUSEL SETTINGS

export default class MultipleItems extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 5,
      // centerMode: true,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      speed: 4000,
      autoplaySpeed: 2000,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 450,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
          },
        },
      ],
    };

    return (
      <div className="bg-wework py-32">
        <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 ">
          <div className="text-center">
            <h3 className="text-4xl sm:text-6xl font-bold text-black my-2">
              We work in several verticals.
            </h3>
            <h3 className="text-4xl sm:text-4xl font-bold text-black opacity-50 lg:mr-48 my-2">
              Innovating solutions tailored for diverse industries.
            </h3>
            <h3 className="text-4xl sm:text-3xl font-bold text-black opacity-25 lg:-mr-32 my-2">
              Adapting to challenges with agility and expertise.
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 m-10 lg:mx-20 ">
          {postData.map((item, index) => (
            <div
              key={index}
              className="group pb-10 before:hover:scale-95 before:hover:w-96 before:hover:h-52 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-96 before:h-32 before:rounded-t-2xl before:bg-gradient-to-bl from-sky-200 via-[#9abff7] to-[#0463f3] before:absolute before:top-0 w-96 h-80 relative bg-slate-50 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden hover:pointer"
            >
              <div className="w-32 h-32 bg-blue mt-8 rounded-full border-4 border-slate-50 z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500">
                <Image
                  src={item.imgSrc}
                  alt={item.name}
                  width={128}
                  height={128}
                  className="rounded-full"
                />
              </div>
              <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
                <span className="text-2xl font-semibold ">{item.name}</span>
                <p className="pt-2">{item.profession}</p>
              </div>
              <Link
                className="mt-10 bg-blue px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
                href="#"
              >
                Follow
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
