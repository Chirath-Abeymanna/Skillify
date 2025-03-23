import mongoose from "mongoose";
import { connectDB } from "@/utils/database"; // Adjust the path based on your file structure

// Mock mongoose.connect
jest.mock("mongoose", () => ({
  connect: jest.fn(),
}));

describe("Database Connection", () => {
  it("should call mongoose.connect with the correct parameters", async () => {
    const mockURI = "mongodb://localhost:27017/testDB";
    process.env.MONGODB_URI = mockURI; // Mock the environment variable

    await connectDB();

    expect(mongoose.connect).toHaveBeenCalledWith(mockURI, {
      dbName: "Skillify",
    });
  });

  it("should log success message on successful connection", async () => {
    console.log = jest.fn(); // Mock console.log

    (mongoose.connect as jest.Mock).mockResolvedValueOnce({}); // Simulate successful connection

    await connectDB();

    expect(console.log).toHaveBeenCalledWith("MongoDB Connected Successfully");
  });

  it("should log error message on connection failure", async () => {
    console.error = jest.fn(); // Mock console.error

    const mockError = new Error("Connection failed");
    (mongoose.connect as jest.Mock).mockRejectedValueOnce(mockError); // Simulate connection failure

    await connectDB();

    expect(console.error).toHaveBeenCalledWith(
      "MongoDB Connection Failed:",
      mockError
    );
  });
});
