"use client";

import { useState } from "react";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center jus p-6">
      <h1 className="text-3xl font-bold text-indigo-800">Privacy Policy</h1>
      <p className="text-gray-400 mb-6">Last updated: 3/10/2025</p>

      {/* Sections */}
      <div className="w-full max-w-2xl space-y-6">
        <Section id="info-collection" title="Information Collection">
          <p>
            We collect various types of information to provide and improve our
            services. This includes personal information you provide directly,
            data collected automatically through cookies and similar
            technologies, and information from third-party sources.
          </p>
        </Section>

        <Section id="data-usage" title="Data Usage">
          <p>
            Your data is used to personalize your experience, improve our
            services, communicate with you about updates and offers, and ensure
            the security of our platform. We do not sell your personal
            information to third parties.
          </p>
        </Section>

        <Section id="data-protection" title="Data Protection">
          <p>
            We implement security measures to protect your personal information
            from unauthorized access, alteration, disclosure, or destruction.
            However, no security system is completely impenetrable.
          </p>
        </Section>

        <Section id="user-rights" title="User Rights">
          <p>
            You have the right to access, modify, or delete your personal data.
            You can also object to certain data processing activities. To
            exercise your rights, please contact us.
          </p>
        </Section>

        <Section id="cookie-policy" title="Cookie Policy">
          <p>
            We use cookies to enhance your experience. You can manage your
            cookie preferences in your browser settings. Disabling cookies may
            affect the functionality of the website.
          </p>
        </Section>

        <Section id="contact-info" title="Contact Information">
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@example.com.
          </p>
        </Section>
      </div>
    </div>
  );
}

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

function Section({ id, title, children }: SectionProps) {
  return (
    <div id={id} className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-lg font-bold text-sky-700">{title}</h2>
      <div className="text-gray-700 mt-2">{children}</div>
    </div>
  );
}
