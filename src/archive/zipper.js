import { renameFile } from '../cmd/renameFile.js';
import { execPromise } from '../utils/execPromise.js';

/** @param {string} fileName */
export const runZipper = async (fileName = '../out/workbook.zip') => {
  const psCommand = `Compress-Archive -Path * -DestinationPath ../out/archive.zip`;
  const res = await execPromise(psCommand, {
    cwd: 'temp',
    shell: 'powershell.exe',
  });
  // await renameFile('out/workbook.zip', 'out/workbook.xlsx');
};
