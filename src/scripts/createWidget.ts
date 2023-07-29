import { cd, mkdir, rm } from "shelljs";

import { WidgetDetails } from "../interfaces/WidgetDetails";
import { silentExec } from "../utils/shell";
import { downloadFile } from "../utils/downloadFile";

export const createWidget = async ({
  widgetName,
  isTypescript,
}: WidgetDetails) => {
  const folder = isTypescript ? "ts" : "js";
  const extension = isTypescript ? "tsx" : "js";

  silentExec(`npx @liferay/cli new ${widgetName} --batch`);

  cd(widgetName);

  rm("-r", "src", ".babelrc");
  mkdir("src");
  mkdir("src/css");

  await Promise.all([
    downloadFile(`react/styles.scss`, "/src/css"),
    downloadFile(`react/${folder}/.babelrc`),
    downloadFile(`react/${folder}/src/index.${extension}`, "/src"),
    downloadFile(`react/${folder}/src/App.${extension}`, "/src"),
    isTypescript ? downloadFile(`react/${folder}/.npmbundlerrc`) : null,
    isTypescript
      ? downloadFile(`react/${folder}/src/liferay.d.ts`, "/src")
      : null,
    isTypescript ? downloadFile(`react/${folder}/tsconfig.json`) : null,
  ]);

  const tsDevDependencies = isTypescript
    ? [
        "@babel/core",
        "@babel/cli",
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript",
        "typescript",
        "@types/react",
        "@types/react-dom",
      ]
    : [];

  const tsScripts = isTypescript
    ? [
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
      ]
    : [];

  return {
    dependencies: ["@liferay/portal-7.4"],
    devDependencies: [...tsDevDependencies],
    scripts: [...tsScripts],
  };
};
