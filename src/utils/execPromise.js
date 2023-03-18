import { exec } from 'child_process';

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
