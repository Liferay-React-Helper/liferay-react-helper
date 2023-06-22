import fs from "fs";
import { WidgetDetails } from "../interfaces/WidgetDetails";
import { copyFile } from "../utils/copyFile";

export const jest = async ({ isTypescript }: WidgetDetails) => {
  const folder = isTypescript ? "jest/ts" : "jest/js";

  console.log("Configuring Jest and React Testing Library...");
  copyFile(`${folder}/jest.config.json`, "jest.config.json");

  console.log("Creating tests folder...");
  fs.mkdirSync("src/tests", { recursive: true });
  copyFile(`${folder}/tests/App.test.tsx`, "src/tests/App.test.tsx");

  const typescriptDevDependencies = isTypescript
    ? ["ts-jest", "@types/jest"]
    : [];

  return {
    dependencies: [],
    devDependencies: [
      "jest",
      "jest-environment-jsdom",
      "@testing-library/jest-dom",
      "@testing-library/react",
      ...typescriptDevDependencies,
    ],
    scripts: [
      {
        key: "test",
        value: "jest",
      },
    ],
  };
};
