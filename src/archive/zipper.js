import { execPromise } from '../utils/execPromise.js';

/** @param {string} fileName */
export const runZipper = async (fileName = 'workbook.xlsx') => {
  const command = `tar -cf  ${fileName} *`;
  const res = await execPromise(command, {
    cwd: 'temp',
  });
};
