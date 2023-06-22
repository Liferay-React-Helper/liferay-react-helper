import fs from "fs";

export const addImport = (file: string, importStatement: string[] | string) => {
  fs.readFile(file, "utf8", (err, data) => {
    const isMoreOneImport = Array.isArray(importStatement);
    const formattedData = isMoreOneImport
      ? importStatement.join(";\r\n") + ";\r\n" + data
      : importStatement + ";\r\n" + data;

    fs.writeFileSync(file, formattedData, { encoding: "utf8" });
  });
};
