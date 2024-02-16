import fs from "fs";
import path from "path";

export const getAllFiles = (folderPath: string) => {
  let response: string[] = [];

  const allFilesAndFolders = fs.readdirSync(folderPath); allFilesAndFolders.forEach(file => {
    const fullFilePath = path.join(folderPath, file);
    const normalizedPath = fullFilePath.replace(/\\/g, '/'); // Replace backslashes with forward slashes

    if (fs.statSync(normalizedPath).isDirectory()) {
      response = response.concat(getAllFiles(normalizedPath))
    } else {
      response.push(normalizedPath);
    }

  });
  return response;
}