import { WidgetDetails } from "../interfaces/WidgetDetails";
import { downloadFile } from "../utils/downloadFile";

export const eslintPrettier = async ({ isTypescript }: WidgetDetails) => {
  const folder = isTypescript ? "eslint/ts" : "eslint/js";

  console.log("Configuring eslint...");
  await Promise.all([
    downloadFile(`eslint/.eslintignore`),
    downloadFile(`${folder}/.eslintrc`),
    downloadFile(`prettier/.prettierignore`),
    downloadFile(`prettier/.prettierrc`),
  ]);

  const typescriptDevDependencies = isTypescript
    ? [
        "@typescript-eslint/eslint-plugin",
        "@typescript-eslint/parser",
        "eslint-import-resolver-typescript",
      ]
    : [];

  return {
    dependencies: [],
    devDependencies: [
      "@babel/eslint-parser",
      "@babel/eslint-plugin",
      "eslint",
      "prettier",
      "eslint-config-prettier",
      "eslint-plugin-import",
      "eslint-plugin-prettier",
      "eslint-plugin-react",
      "eslint-plugin-react-hooks",
      "prettier",
      ...typescriptDevDependencies,
    ],
    scripts: [
      {
        key: "lint",
        value: "eslint --ext .js,.jsx,.ts,.tsx",
      },
      {
        key: "lint:fix",
        value: "eslint --fix --ext .js,.jsx,.ts,.tsx",
      },
      {
        key: "format",
        value:
          "prettier --write --ext .js,.jsx,.ts,.tsx --config ./.prettierrc",
      },
      {
        key: "prepare",
        value: "npm run format && npm run lint:fix",
      },
    ],
  };
};
