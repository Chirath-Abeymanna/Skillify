'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// Define the type for a consultant
interface Consultant {
  id: number;
  name: string;
  title: string;
  image: string;
  description: string;
  phone: string;
  email: string;
  linkedin: string;
  company: string;
}


export default function Consultations() {
  const router = useRouter();
  
  const consultants = [
    {
      id: 1,
      name: 'Dr. Jon Doe',
      title: 'PhD in Consultation',
      image: '/images/consultation/consultant1.jpg',
      description: 'Dr. Jon Doe specializes in business and personal consultations, helping clients navigate complex challenges with expert guidance.',
      phone: '+94 23-456-7890',
      email: 'jon.doe@example.com',
      linkedin: 'https://www.linkedin.com/in/jondoe',
      company: 'ConsultPro Inc.',
    },
    {
      id: 2,
      name: 'Dr. Jane Doe',
      title: 'PhD in Health',
      image: '/images/consultation/consultant2.jpg',
      description: 'Dr. Jane Doe is a health expert dedicated to promoting wellness and preventive healthcare strategies for individuals and communities.',
      phone: '+94 77-654-3210',
      email: 'jane.doe@example.com',
      linkedin: 'https://www.linkedin.com/in/janedoe',
      company: 'HealthFirst',
    },
    {
      id: 3,
      name: 'Dr. Sam Smith',
      title: 'PhD in Wellness',
      image: '/images/consultation/consultant3.jpg',
      description: 'Dr. Sam Smith focuses on holistic wellness, offering guidance on mental, physical, and emotional well-being.',
      phone: '+94 77-123-4567',
      email: 'sam.smith@example.com',
      linkedin: 'https://www.linkedin.com/in/samsmith',
      company: 'Wellness Hub',
    },
    {
      id: 4,
      name: 'Dr. Renal Perera',
      title: 'PhD in Education',
      image: '/images/consultation/consultant4.jpg',
      description: 'Dr. Renal Perera is an education specialist who assists students and professionals in enhancing their learning and career development.',
      phone: '+94 77-987-6543',
      email: 'senith20232345@iit.ac.lk',
      linkedin: 'https://www.linkedin.com/in/renal-perera-b880ba295/',
      company: 'EduPro Academy',
    },
  ];

  const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);

  const openContactPanel = (consultant: Consultant) => {
    setSelectedConsultant(selectedConsultant?.id === consultant.id ? null : consultant);
  };

  return (
    <div className="min-h-screen relative bg-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-2xl font-semibold mb-6 text-gray-700 text-center">Consultations</h1>

      <div className="flex flex-col gap-6 w-full max-w-4xl">
        {consultants.map((consultant) => (
          <div key={consultant.id} className="relative">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between bg-white p-4 sm:p-6 rounded-lg border border-gray-300 shadow-sm w-full relative">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
                <div className="w-12 h-12 sm:w-16 sm:h-16 relative rounded-full overflow-hidden border border-gray-400">
                  <Image src={consultant.image} alt={consultant.name} layout="fill" objectFit="cover" />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-lg font-bold text-gray-900">{consultant.name}</p>
                  <p className="text-sm text-gray-600">{consultant.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{consultant.description}</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 w-full sm:w-auto flex flex-col items-center relative">
                <button
                  onClick={() => openContactPanel(consultant)}
                  className="bg-[#3C3CEA] text-white font-semibold text-sm px-5 py-2 rounded-full shadow-lg hover:bg-[#211CA6] focus:outline-none w-full lg:w-28 sm:w-auto mb-4"
                >
                  Contact
                </button>

                <button 
                  onClick={() => router.push('/payment')}
                  className="bg-green-600 text-white font-semibold text-sm px-5 py-2 rounded-full shadow-lg hover:bg-green-700 focus:outline-none w-full lg:w-28 sm:w-auto"
                >
                  Book Now
                </button>

                {/* Contact Panel (Now Absolutely Positioned) */}
                {selectedConsultant?.id === consultant.id && (
                  <div 
                    className="absolute bg-white shadow-lg border border-gray-300 p-4 rounded-lg w-64 z-10 right-0 top-full mt-2"
                  >
                    <button
                      onClick={() => setSelectedConsultant(null)}
                      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-lg"
                    >
                      &times;
                    </button>
                    <h2 className="text-lg font-bold text-gray-900">{selectedConsultant.name}</h2>
                    <p className="text-sm text-gray-600">{selectedConsultant.title}</p>
                    <div className="mt-3 space-y-2">
                      <p className="text-sm text-gray-700"><strong>Phone:</strong> {selectedConsultant.phone}</p>
                      <p className="text-sm text-gray-700">
                        <strong>Email:</strong> 
                        <a href={`mailto:${selectedConsultant.email}`} className="text-blue-600 hover:underline"> {selectedConsultant.email}</a>
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>LinkedIn:</strong> 
                        <a href={selectedConsultant.linkedin} target="_blank" className="text-blue-600 hover:underline"> Profile</a>
                      </p>
                      <p className="text-sm text-gray-700"><strong>Company:</strong> {selectedConsultant.company}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
