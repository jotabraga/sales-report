import type { Config } from "jest";

const baseConfig: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
};

export default baseConfig;
