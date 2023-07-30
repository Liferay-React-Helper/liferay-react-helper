import "dotenv/config";
import { DownloaderHelper } from "node-downloader-helper";

export const downloadFile = async (
  resourcePath: string,
  destinationPath = "",
): Promise<void> => {
  const user = process.env.GITHUB_USER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH;
  const baseUrl = `https://raw.githubusercontent.com/${user}/${repo}/${branch}/templates/`;

  return new Promise((resolve, reject) => {
    const dl = new DownloaderHelper(
      `${baseUrl}${resourcePath}`,
      `${process.cwd()}${destinationPath}`,
    );

    dl.on("end", () => {
      console.log(`Downloading ${resourcePath}`);
      resolve();
    });

    dl.start().catch((err) => {
      console.error(err);
      reject(err);
    });

    dl.on("error", (err) => {
      console.log("Download Failed", err);
      reject(err);
    });
  });
};
