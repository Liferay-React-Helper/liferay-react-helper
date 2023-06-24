import { cd, mkdir, rm } from "shelljs";

import { WidgetDetails } from "../interfaces/WidgetDetails";
import { silentExec } from "../utils/shell";
import { downloadFile } from "../utils/downloadFile";

export const createWidget = async ({
  widgetName,
  isTypescript,
}: WidgetDetails) => {
  const folder = isTypescript ? "react/ts" : "react/js";

  silentExec(`liferay new ${widgetName} --batch`);

  cd(widgetName);

  rm("-r", "src", ".babelrc");
  mkdir("src");
  mkdir("src/css");

  await Promise.all([
    downloadFile(`${folder}/.npmbundlerrc`),
    downloadFile(`${folder}/.babelrc`),
    downloadFile(`${folder}/src/index.tsx`, "/src"),
    downloadFile(`${folder}/src/liferay.d.ts`, "/src"),
    downloadFile(`${folder}/src/App.tsx`, "/src"),
    downloadFile(`${folder}/src/css/styles.scss`, "/src/css"),
    isTypescript ? downloadFile(`${folder}/tsconfig.json`) : null,
  ]);

  const typescriptDevDependencies = isTypescript
    ? [
        "@babel/preset-typescript",
        "typescript",
        "@types/react",
        "@types/react-dom",
      ]
    : [];

  return {
    dependencies: ["@liferay/portal-7.4"],
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
