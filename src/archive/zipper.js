import { resolve } from "node:path";
import { renameFile } from "../cmd/renameFile.js";
import { execPromise } from "../utils/execPromise.js";
import { platform } from "node:os";

/** @param {string} fileName */
export const runZipper = async (fileName = "workbook") => {
  if (platform() === "win32") {
    const psCommand = `Compress-Archive -Path * -DestinationPath ${resolve(
      "out"
    )}/${fileName}.zip`;
    const res = await execPromise(psCommand, {
      cwd: "temp",
      shell: "powershell.exe",
    });
  } else {
    const psCommand = `zip -r ${resolve("out")}/${fileName}.zip ${resolve(
      "temp"
    )}`;
    const res = await execPromise(psCommand);
    console.log(res);
  }

  await renameFile(`out/${fileName}.zip`, `out/${fileName}.xlsx`);
};
