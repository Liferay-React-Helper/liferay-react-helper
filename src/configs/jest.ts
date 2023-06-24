import fs from "fs";
import { WidgetDetails } from "../interfaces/WidgetDetails";
import { downloadFile } from "../utils/downloadFile";

export const jest = async ({ isTypescript }: WidgetDetails) => {
  const folder = isTypescript ? "jest/ts" : "jest/js";

  console.log("Configuring Jest and React Testing Library...");

  fs.mkdirSync("src/tests", { recursive: true });

  await Promise.all([
    downloadFile(`${folder}/jest.config.json`),
    downloadFile(`${folder}/tests/App.test.tsx`, "/src/tests"),
  ]);

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
