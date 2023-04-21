import { resolve } from "path";
import { runZipper } from "../archive/zipper.js";
import { copyFiles } from "../cmd/copyFiles.js";
import { deleteFilesFromDir } from "../cmd/deleteFiles.js";
import { xlsContent } from "../data/xlsxBuilder.js";
import { xlsxFiles } from "../data/xlsxFiles.js";
import { buildSheetObject } from "./buildSheetObject.js";

/** @param {{ tempDir: string }} config */

export const runApp = async (data, config) => {
  const tempDir = config?.tempDir || "temp";
  await deleteFilesFromDir(resolve(tempDir));
  const xlsObject = await buildSheetObject();
  await xlsContent.copyFilesToTempDir(xlsObject, resolve(tempDir));

  await deleteFilesFromDir("out");
  await runZipper();
};
