import { resolve } from "path";
import { deleteFilesFromDir, runZipper } from "../utils/file-utils.js";
import { xlsContent } from "../data/xlsxBuilder.js";
import { buildSheetObject } from "../data/buildSheetObject.js";
import { xlsxFiles } from "../data/xlsxFiles.js";
import { googleSheetStyles } from "../data/BuildStyles.js";

/** @param {{ tempDir: string }} config */

export const runApp = async (data, config) => {
  console.log(
    "xlsxFiles.styles.content === googleSheetStyles",
    xlsxFiles.styles.content === googleSheetStyles
  );
  const tempDir = config?.tempDir || "temp";
  await deleteFilesFromDir(resolve(tempDir));
  const xlsObject = await buildSheetObject();
  await xlsContent.copyFilesToTempDir(xlsObject, resolve(tempDir));

  await deleteFilesFromDir("out");
  await runZipper();
};
