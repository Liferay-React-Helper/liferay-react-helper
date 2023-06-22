import fs from "fs";

interface Rule {
  test: string;
  exclude: string | string[];
  use: string | string[];
}

interface NpmBundle {
  sources: string[];
  rules: Rule[];
}

export const getNpmBundle = (): NpmBundle => {
  const npmBundle = fs.readFileSync(".npmbundlerrc");
  const parsedNpmBundle = JSON.parse(npmBundle.toString());

  return parsedNpmBundle;
};

export const writeNpmBundle = (npmBundle: NpmBundle) => {
  fs.writeFileSync(".npmbundlerrc", JSON.stringify(npmBundle, null, 2));
};
