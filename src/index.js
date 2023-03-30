import { runZipper } from './archive/zipper.js';
import { copyFiles } from './cmd/copyFiles.js';
import { deleteFiles } from './cmd/deleteFiles.js';
import { addData } from './data/addData.js';

const runApp = async () => {
  await copyFiles('xlsx/base', 'temp');
  await addData();
  await deleteFiles('out');
  await runZipper();
};
runApp();
console.log('success!');
