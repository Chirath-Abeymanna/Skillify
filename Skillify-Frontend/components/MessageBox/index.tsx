"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface MessageBoxProps {
  message: string;
  type: "success" | "info" | "warning" | "error";
  duration?: number;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  message,
  type,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const getImage = () => {
    switch (type) {
      case "success":
        return "/images/messageBox/sucess.svg";
      case "info":
        return "/images/messageBox/info.svg";
      case "warning":
        return "/images/messageBox/warning.svg";
      case "error":
        return "/images/messageBox/error.svg";
      default:
        return "/images/messageBox/info.svg";
    }
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isVisible ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 80 }}
      className={`fixed flex space-x-5 top-32 right-4 p-4 rounded shadow-lg z-50 text-gray-500 bg-white ${
        !isVisible && "hidden"
      }`}
    >
      <img src={getImage()} alt="" className="w-10 h-10" />
      <p className="flex items-center">{message}</p>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-auto text-xl text-gray-300 hover:text-red-500"
      >
        &times;
      </button>
    </motion.div>
  );
};

export default MessageBox;
