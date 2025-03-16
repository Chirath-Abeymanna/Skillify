import React, { useState } from "react";

const CookiesButton: React.FC = () => {
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  function Card({
    setCookiesAccepted,
  }: {
    setCookiesAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    return (
      <div className="bottom-4 left-4 right-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg overflow-hidden shadow-xl max-w-sm p-4 sticky">
        <p className="text-sm mb-4 text-white">
          This website uses cookies to enhance user experience and to analyze
          performance and traffic on our website.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="duration-300 bg-black/0 hover:bg-black/25 text-white font-bold py-2 px-4 rounded"
            onClick={() => setCookiesAccepted(true)}
          >
            Ok
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2  rounded shadow-lg text-center">
      {/* Cookie Consent */}
      {!cookiesAccepted && <Card setCookiesAccepted={setCookiesAccepted} />}
    </div>
  );
};

export default CookiesButton;
