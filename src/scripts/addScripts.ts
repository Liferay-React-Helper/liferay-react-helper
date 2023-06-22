import { Scripts } from "../interfaces/Scripts";
import { getPackageJson, writePackageJson } from "../utils/packageJson";

export const addScripts = async ({ scripts }: Scripts) => {
  console.log("Adding scripts...");

  const packageJson = getPackageJson();

  for (const { key, value } of scripts) {
    packageJson.scripts[key] = value;
  }

  writePackageJson(packageJson);
};
