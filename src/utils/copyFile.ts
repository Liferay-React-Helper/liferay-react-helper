import fs from "fs";
import path from "path";

export const copyFile = (srcPath: string, destinationPath = "") => {
  const rootDirectory = path.dirname(path.dirname(__dirname));
  const sourceFilePath = path.resolve(rootDirectory, `templates/${srcPath}`);
  const destinationFilePath = path.resolve(process.cwd(), destinationPath);

  fs.copyFileSync(sourceFilePath, destinationFilePath);
};
