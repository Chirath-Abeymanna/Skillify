import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to our Privacy Policy page. Your privacy is critically important
        to us.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
      <p className="mb-4">
        We collect various types of information in connection with the services
        we provide, including:</p>
      <ul className="list-disc list-inside">
        <li>
            Personal identification information (Name, email address, phone
            number, etc.)
        </li>
        <li>Usage data</li>
        <li>Cookies and tracking technologies</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">How We Use Information</h2>
      <p className="mb-4">
        We use the collected information for various purposes:</p>
      <ul className="list-disc list-inside">
        <li>To provide and maintain our service</li>
        <li>To notify you about changes to our service</li>
        <li>To provide customer support</li>
        <li>
            To gather analysis or valuable information so that we can improve
            our service
        </li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy, please contact us
        at: support@example.com
      </p>
    </div>
  );
};

export default PrivacyPolicy;
