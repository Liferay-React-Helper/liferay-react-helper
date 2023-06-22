import fs from "fs";

interface PackageJson {
  scripts: {
    [key: string]: string;
  };
  devDependencies: {
    [key: string]: string;
  };
  dependencies: {
    [key: string]: string;
  };
}

export const getPackageJson = (): PackageJson => {
  const packageJson = fs.readFileSync("package.json");
  const parsedPackageJson = JSON.parse(packageJson.toString());

  return parsedPackageJson;
};

export const writePackageJson = (packageJson: PackageJson) => {
  fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
};
