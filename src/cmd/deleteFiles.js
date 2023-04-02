import fs from "node:fs";
import path, { resolve } from "node:path";

export const deleteFilesFromDir = async (
  directory = "temp",
  exclude = "xlsx"
) => {
  const dir = resolve(directory);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir);
};
