import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node", // Use 'node' environment for backend testing
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Map @/ to the project root folder
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files
  },
};

export default config;
