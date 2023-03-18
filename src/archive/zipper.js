import { execPromise } from './execPromise.js';

export const runZipper = async () => {
  const command1 = `tar -rf 'myfiles.tar' temp`;
  const command = `tar -cf archive.zip *`;
  const res = await execPromise(command);
  console.log(res);
};
