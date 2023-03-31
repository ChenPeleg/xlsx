import { runZipper } from './archive/zipper.js';
import { copyFiles } from './cmd/copyFiles.js';
import { deleteFiles } from './cmd/deleteFiles.js';
import { editData } from './data/editData.js';

/** @param {{ tempDir: string }} config */

const runApp = async (data, config) => {
  await copyFiles('xlsx/base', config.tempDir);
  await editData(data, config);
  await deleteFiles('out');
  await runZipper();
};
runApp(null, { tempDir: 'temp' });
console.log('success!');
