import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'node:path';

export const replaceInFile = (path, strToReplace, newStr) => {
  const reportFilePath = resolve(path);
  const fileAsString = readFileSync(path).toString();
  writeFileSync(reportFilePath, fileAsString.replace(strToReplace, newStr));
};
