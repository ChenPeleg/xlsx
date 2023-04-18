import { resolve } from "path";
import { runZipper } from "../archive/zipper.js";
import { copyFiles } from "../cmd/copyFiles.js";
import { deleteFilesFromDir } from "../cmd/deleteFiles.js";
import { editData } from "../data/editData.js";
import { xlsContent } from "../data/xlsxBuilder.js";
import { xlsxFiles } from "../data/xlsxFiles.js";

/** @param {{ tempDir: string }} config */

export const runApp = async (data, config) => {
  const tempDir = config?.tempDir || "temp";
  await deleteFilesFromDir(resolve(tempDir));
  await xlsContent.copyFilesToTempDir(xlsxFiles, resolve(tempDir));
  const xlsObject = await editData(data, config);
  await deleteFilesFromDir("out");
  await runZipper();
};
