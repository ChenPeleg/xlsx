import { resolve } from "node:path";
import { platform } from "node:os";
import { rename } from "node:fs/promises";
import { exec } from "child_process";
import fs from "node:fs";

export const deleteFilesFromDir = async (directory) => {
  const dir = resolve(directory);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir);
};

export const execPromise = async (command, extraParams = {}) => {
  return new Promise(function (resolve, reject) {
    exec(command, extraParams, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout.trim());
    });
  });
};

const renameFile = async (oldPath, newPath) => {
  const res = await rename(oldPath, newPath);
  return res;
};

/** @param {string} fileName */
/** @param {string} outDir */
export const runZipper = async (fileName = "workbook", outDir, tempDir) => {
  if (platform() === "win32") {
    const psCommand = `Compress-Archive -Path * -DestinationPath ${resolve(
      outDir
    )}/${fileName}.zip`;
    const res = await execPromise(psCommand, {
      cwd: tempDir,
      shell: "powershell.exe",
    });
  } else {
    const psCommand = `zip -r ${resolve(outDir)}/${fileName}.zip ${resolve(
      tempDir
    )}`;
    const res = await execPromise(psCommand);
    console.log(res);
  }

  await renameFile(`${outDir}/${fileName}.zip`, `${outDir}/${fileName}.xlsx`);
};
