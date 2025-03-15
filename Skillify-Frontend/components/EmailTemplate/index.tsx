import React from "react";

interface EmailTemplateProps {
  otp: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ otp }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        color: "#333",
      }}
    >
      <h2 style={{ color: "#007bff" }}>Your One-Time Password (OTP)</h2>
      <p>Use the following OTP to complete your verification:</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            background: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            display: "inline-block",
            borderRadius: "0px",
            letterSpacing: "5px",
          }}
        >
          {otp}
        </h1>
      </div>

      <p>This OTP is valid for a limited time. Do not share it with anyone.</p>
      <hr
        style={{
          margin: "20px 0",
          border: "none",
          borderBottom: "1px solid #ddd",
        }}
      />
      <p>Best Regards,</p>
      <p>
        <strong>Skillify solutions.</strong>
      </p>
    </div>
  );
};

export default EmailTemplate;
