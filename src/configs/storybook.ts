import { WidgetDetails } from "../interfaces/WidgetDetails";
import { downloadFile } from "../utils/downloadFile";
import { mkdir } from "shelljs";

export const storybook = async ({ isTypescript }: WidgetDetails) => {
  const folder = isTypescript ? "ts" : "js";
  const extension = isTypescript ? "ts" : "js";
  const reactExtension = isTypescript ? "tsx" : "jsx";

  console.log("Configuring Storybook...");

  mkdir(".storybook");
  mkdir("src/stories");

  await Promise.all([
    downloadFile(`storybook/${folder}/main.${extension}`, "/.storybook"),
    downloadFile(`storybook/${folder}/preview.${extension}`, "/.storybook"),
    downloadFile(`storybook/${folder}/stories/button.css`, "/src/stories"),
    downloadFile(
      `storybook/${folder}/stories/Button.${reactExtension}`,
      "/src/stories",
    ),
    downloadFile(
      `storybook/${folder}/stories/Button.stories.${extension}`,
      "/src/stories",
    ),
  ]);

  const jsDevDependencies = !isTypescript ? ["prop-types"] : [];

  return {
    dependencies: [],
    devDependencies: [
      "storybook",
      "@storybook/addon-essentials",
      "@storybook/addon-interactions",
      "@storybook/addon-links",
      "@storybook/addon-onboarding",
      "@storybook/blocks",
      "@storybook/react",
      "@storybook/react-webpack5",
      "@storybook/testing-library",
      ...jsDevDependencies,
    ],
    scripts: [
      {
        key: "storybook",
        value: "storybook dev -p 6006",
      },
      {
        key: "build-storybook",
        value: "storybook build",
      },
    ],
  };
};
