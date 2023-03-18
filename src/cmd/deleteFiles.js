import fs from 'node:fs/promises';
import path from 'node:path';

export const deleteFiles = async (dir = 'temp', exclude = 'xlsx') => {
  for (const file of await fs.readdir(dir)) {
    console.log(file.includes(exclude));
    await fs.unlink(path.join(dir, file));
  }
};
