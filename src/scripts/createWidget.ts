import fs from "fs";
import { cd } from "shelljs";

import { WidgetDetails } from "../interfaces/WidgetDetails";
import { copyFile } from "../utils/copyFile";
import { silentExec } from "../utils/shell";

export const createWidget = async ({
  widgetName,
  isTypescript,
}: WidgetDetails) => {
  const folder = isTypescript ? "react/ts" : "react/js";

  silentExec(`liferay new ${widgetName} --batch`);

  cd(widgetName);

  fs.rmSync("src", { recursive: true });

  fs.mkdirSync("src", { recursive: true });
  fs.mkdirSync("src/css", { recursive: true });

  copyFile(`${folder}/.npmbundlerrc`, ".npmbundlerrc");

  console.log("Configuring babelrc...");
  copyFile(`${folder}/.babelrc`, ".babelrc");

  console.log("Creating React widget...");
  copyFile(`${folder}/src/index.tsx`, "src/index.tsx");
  copyFile(`${folder}/src/liferay.d.ts`, "src/liferay.d.ts");
  copyFile(`${folder}/src/App.tsx`, "src/App.tsx");

  console.log("Adding sample CSS styles...");
  copyFile(`${folder}/src/css/styles.scss`, "src/css/styles.scss");

  if (isTypescript) {
    console.log("Configuring tsconfig...");
    copyFile(`${folder}/tsconfig.json`, "tsconfig.json");
  }

  const typescriptDevDependencies = isTypescript
    ? [
        "@babel/preset-typescript",
        "typescript",
        "@types/react",
        "@types/react-dom",
        "@types/node",
      ]
    : [];

  return {
    dependencies: ["@liferay/portal-agnostic", "react", "react-dom"],
    devDependencies: [
      "@babel/core",
      "@babel/cli",
      "@babel/preset-env",
      "@babel/preset-react",
      ...typescriptDevDependencies,
    ],
    scripts: [
      {
        key: "check-types",
        value: "tsc",
      },
      {
        key: "configure",
        value: "liferay deploy --configure",
      },
      {
        key: "build",
        value:
          'npm run check-types && babel --source-maps -d build src --extensions ".ts,.tsx" && liferay-npm-bundler',
      },
      {
        key: "deploy",
        value: "npm run build && liferay deploy --only",
      },
      {
        key: "clean",
        value: "liferay clean",
      },
    ],
  };
};
