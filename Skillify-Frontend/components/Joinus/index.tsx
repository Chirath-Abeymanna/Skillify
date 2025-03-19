'use client';

import { useState } from 'react';
import emailjs from 'emailjs-com';

const Join = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const serviceId = 'your_service_id';
    const templateId = 'your_template_id';
    const userId = 'your_user_id';

    const templateParams = {
      user_name: formData.name,
      user_email: formData.email,
      to_email: 'skillify@gmail.com', // Change this to Skillify's email
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, userId);
      setMessage('Thank you for joining! A confirmation email has been sent.');
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Failed to send email:', error);
      setMessage('Failed to send email. Please try again later.');
    }
  };

  return (
    <div className="bg-joinus my-32" id="joinus-section">
      <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8">
        <div className="text-center">
          <h3 className="text-blue text-lg font-normal tracking-widest">CONTACT US</h3>
          <h2 className="text-4xl sm:text-6xl font-bold my-6 leading-10">
            Get in Touch with Skillify
          </h2>
          <p className="text-lightblack text-base font-normal">
            Have any questions or want to join our skill-building programs? Contact us today!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto max-w-4xl pt-5">
          <div className="sm:flex items-center mx-5 p-5 sm:p-0 rounded-xl justify-between bg-lightgrey sm:rounded-full">
            <input
              type="text"
              name="name"
              className="my-4 py-4 sm:pl-6 lg:text-xl text-black sm:rounded-full bg-lightgrey pl-1 focus:outline-none bg-emailbg focus:text-black"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              className="my-4 py-4 sm:pl-6 lg:text-xl text-black sm:border-l border-linegrey bg-lightgrey focus:outline-none bg-emailbg focus:text-black"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="joinButton w-full sm:w-0 text-xl text-white font-semibold text-center rounded-xl sm:rounded-full bg-blue-400 hover:bg-blue-700 sm:mr-3"
            >
              Send
            </button>
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            We respect your privacy. Your information will only be used to contact you regarding Skillify programs.
          </p>
        </form>

        {message && <p className="text-center mt-4 text-blue-500">{message}</p>}
      </div>
    </div>
  );
};

export default Join;
