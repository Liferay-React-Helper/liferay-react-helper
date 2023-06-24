import { downloadFile } from "../utils/downloadFile";
import { addImport } from "../scripts/addImport";
import { getNpmBundle, writeNpmBundle } from "../utils/npmBundle";

export const tailwind = async () => {
  console.log("Adding Tailwind CSS...");

  await Promise.all([
    downloadFile("tailwind/tailwind.css", "/src/css"),
    downloadFile("tailwind/tailwind.config.js"),
  ]);

  const npmBundle = getNpmBundle();

  npmBundle.sources.push("build");
  npmBundle.rules = [
    {
      test: "\\.(css|scss)$",
      exclude: ["node_modules", "tailwind.css"],
      use: ["sass-loader", "css-loader"],
    },
  ];

  writeNpmBundle(npmBundle);

  addImport("src/App.tsx", "import './css/tailwind.output.css';");

  return {
    dependencies: [],
    devDependencies: ["tailwindcss"],
    scripts: [
      {
        key: "tailwind:build",
        value:
          "tailwindcss -i src/css/tailwind.css -o build/css/tailwind.output.css",
      },
      {
        key: "prebuild",
        value: "npm run tailwind:build",
      },
    ],
  };
};
