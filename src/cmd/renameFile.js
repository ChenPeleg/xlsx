import { rename } from 'node:fs/promises';

export const renameFile = async (oldPath, newPath) => {
  const res = await rename(oldPath, newPath);
  return res;
};
