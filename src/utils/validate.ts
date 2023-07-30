import fs from "fs";

export const validateWidgetName = (input: string) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(input)) {
      reject(
        new Error(`Widget '${input}' already exists. Choose a different name.`),
      );
    }

    resolve(true);
  });
};
