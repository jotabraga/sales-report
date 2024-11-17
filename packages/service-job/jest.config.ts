import baseConfig from "../../jest.config.base";
import type { Config } from "jest";

const config: Config = {
  ...baseConfig,
  rootDir: "./",
  testMatch: ["<rootDir>/test/**/*.spec.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.test.json",
    },
  },
};

export default config;
