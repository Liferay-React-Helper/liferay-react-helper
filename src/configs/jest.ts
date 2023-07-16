import { mkdir } from "shelljs";
import { WidgetDetails } from "../interfaces/WidgetDetails";
import { downloadFile } from "../utils/downloadFile";

export const jest = async ({ isTypescript }: WidgetDetails) => {
  const folder = isTypescript ? "ts" : "js";
  const extension = isTypescript ? "tsx" : "js";

  console.log("Configuring Jest and React Testing Library...");

  mkdir("src/tests");

  await Promise.all([
    downloadFile(`jest/${folder}/jest.config.json`),
    downloadFile(`jest/${folder}/App.test.${extension}`, "/src"),
  ]);

  const tsDevDependencies = isTypescript ? ["ts-jest", "@types/jest"] : [];

  return {
    dependencies: [],
    devDependencies: [
      "jest",
      "jest-environment-jsdom",
      "@testing-library/jest-dom",
      "@testing-library/react",
      "@testing-library/user-event",
      ...tsDevDependencies,
    ],
    scripts: [
      {
        key: "test",
        value: "jest",
      },
    ],
  };
};
