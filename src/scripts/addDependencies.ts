import { Dependencies } from "../interfaces/Dependencies";
import { silentExec } from "../utils/shell";

export const addDependencies = async ({
  dependencies,
  devDependencies,
}: Dependencies) => {
  console.log("Adding dependencies...");

  if (dependencies.length) {
    silentExec(`npx add-dependencies ${dependencies.join(" ")}`);
  }

  if (devDependencies.length) {
    silentExec(`npx add-dependencies ${devDependencies.join(" ")} -D`);
  }
};
