import { renameFile } from '../cmd/renameFile.js';
import { execPromise } from '../utils/execPromise.js';

/** @param {string} fileName */
export const runZipper = async (fileName = 'workbook') => {
  const psCommand = `Compress-Archive -Path * -DestinationPath ../out/${fileName}.zip`;
  const res = await execPromise(psCommand, {
    cwd: 'temp',
    shell: 'powershell.exe',
  });
  await renameFile(`out/${fileName}.zip`, `out/${fileName}.xlsx`);
};
