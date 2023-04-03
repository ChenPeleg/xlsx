import { readFileSync, writeFileSync } from "fs";
import { resolve } from "node:path";
/**
 * @param {string} path
 * @param {string} strToReplace
 * @param {string} newStr
 */
export const replaceInFile = (path, strToReplace, newStr) => {
  const reportFilePath = resolve(path);
  const fileAsString = readFileSync(path).toString();
  writeFileSync(reportFilePath, fileAsString.replace(strToReplace, newStr));
};
