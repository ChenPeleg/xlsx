import { resolve } from "path";
import { runZipper } from "../archive/zipper.js";
import { copyFiles } from "../cmd/copyFiles.js";
import { deleteFilesFromDir } from "../cmd/deleteFiles.js";
import { editData } from "../data/editData.js";

/** @param {{ tempDir: string }} config */

export const runApp = async (data, config) => {
  const tempDir = config?.tempDir || "temp";

  await deleteFilesFromDir(resolve(tempDir));
  await copyFiles(resolve("xlsx", "base"), tempDir);
  await editData(data, config);
  await deleteFilesFromDir("out");
  await runZipper();
};
