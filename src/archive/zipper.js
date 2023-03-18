import { execPromise } from '../utils/execPromise.js';

export const runZipper = async () => {
  const command1 = `tar -rf 'myfiles.tar' temp`;
  const command = `tar -cf archive.zip *`;
  const res = await execPromise(command, {
    cwd: 'temp',
  });
  console.log(res);
};
