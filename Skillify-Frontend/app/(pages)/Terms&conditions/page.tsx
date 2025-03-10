"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
    const [date, setDate] = useState('');
  
    useEffect(() => {
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
    }, []);
  
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="bg-white shadow-2xl rounded-2xl p-8 max-w-3xl w-full"
        >
          <motion.h1 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-gray-800 mb-4 text-center"
          >
            Terms and Conditions
          </motion.h1>
          <p className="text-gray-600 text-sm text-center mb-6">Last Updated: {date}</p>
  
          <div className="space-y-6 text-gray-700">
            {terms.map((term, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: index * 0.1 }}
              >
                <h2 className="text-xl font-semibold mb-2">{term.title}</h2>
                <p>{term.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  };
  
  const terms = [
    { title: '1. Acceptance of Terms', description: 'By accessing or using this website, you agree to be bound by these Terms and Conditions and any other applicable laws or regulations.' },
    { title: '2. Changes to Terms', description: 'We reserve the right to modify, update, or change these Terms and Conditions at any time. Continued use constitutes acceptance of changes.' },
    { title: '3. User Responsibilities', description: 'You are responsible for all activities under your account and agree not to engage in unlawful activities.' },
    { title: '4. Privacy Policy', description: 'Your use of the website is also governed by our Privacy Policy, explaining how we collect, use, and protect your personal information.' },
    { title: '5. Intellectual Property', description: 'The content on the website is the property of Skillify and protected by intellectual property laws.' },
    { title: '6. User-Generated Content', description: 'By submitting content, you grant us a non-exclusive, royalty-free, worldwide license to use and distribute it.' },
    { title: '7. Third-Party Links', description: 'We are not responsible for the content or actions of third-party websites linked on our site.' },
    { title: '8. Disclaimers and Limitation of Liability', description: 'We do not guarantee that the website will be error-free or uninterrupted. Liability for damages is limited.' },
    { title: '9. Indemnification', description: 'You agree to indemnify and hold harmless Skillify from claims arising from your use of the website.' },
    { title: '10. Termination', description: 'We reserve the right to suspend or terminate your access at any time for any reason.' },
    { title: '11. Governing Law', description: 'These terms are governed by the laws of SriLanka.' },
    { title: '12. Contact Information', description: 'If you have questions, contact us at info.skillify.inc@gmail.com.' }
  ];
  

  export default TermsAndConditions;
  