import { Dependencies } from "../interfaces/Dependencies";
import { getPackageJson, writePackageJson } from "../utils/packageJson";
import { silentExec } from "../utils/shell";

export const addDependencies = async ({
  dependencies,
  devDependencies,
}: Dependencies) => {
  console.log("Adding dependencies...");

  const packageJson = getPackageJson();

  packageJson.dependencies = {};

  writePackageJson(packageJson);

  if (dependencies.length) {
    silentExec(`npx add-dependencies ${dependencies.join(" ")}`);
  }

  if (devDependencies.length) {
    silentExec(`npx add-dependencies ${devDependencies.join(" ")} -D`);
  }
};
