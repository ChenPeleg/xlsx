import { resolve } from "node:path";
import { platform } from "node:os";
import { rename } from "node:fs/promises";
import { exec } from "child_process";
import fs from "node:fs";

export const deleteFilesFromDir = async (directory = "temp") => {
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
