"use client";

import Image from "next/image";

export default function Consultations() {
  const consultants = [
    {
      id: 1,
      name: "Dr. Jon Doe",
      title: "PhD in Consultation",
      image: "/images/consultation/consultant1.jpg",
    },
    {
      id: 2,
      name: "Dr. Jane Doe",
      title: "PhD in Health",
      image: "/images/consultation/consultant2.jpg",
    },
    {
      id: 3,
      name: "Dr. Sam Smith",
      title: "PhD in Wellness",
      image: "/images/consultation/consultant3.jpg",
    },
    {
      id: 4,
      name: "Dr. Ron Perera",
      title: "PhD in Education",
      image: "/images/consultation/consultant4.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-10">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-8 text-gray-700">
        Consultation
      </h1>

      {/* Consultant Cards */}
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        {consultants.map((consultant) => (
          <div
            key={consultant.id}
            className="flex items-center justify-between bg-white p-6 rounded-xl border-4 border-black shadow-md w-full"
          >
            {/* Profile Image */}
            <div className="flex items-center gap-4">
              <Image
                src={consultant.image}
                alt={consultant.name}
                width={60}
                height={60}
                className="rounded-full border"
              />
              <div>
                <p className="text-lg font-bold">{consultant.name}</p>
                <p className="text-sm text-gray-500">{consultant.title}</p>
              </div>
            </div>

            {/* Contact Button */}
            <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md">
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
