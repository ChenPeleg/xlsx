import { execPromise } from '../utils/execPromise.js';

/** @param {string} fileName */
export const runZipper = async (fileName = '../out/workbook.zip') => {
  const command = `tar -a -c -f  ${fileName} *`;
  const res = await execPromise(command, {
    cwd: 'temp',
  });
};
