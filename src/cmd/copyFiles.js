import { cp } from 'node:fs/promises';

export const copyFiles = (src, dest) => {
  cp(src, dest, { recursive: true });
};
