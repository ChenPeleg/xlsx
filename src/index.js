import { runZipper } from './archive/zipper.js';
import { copyFiles } from './cmd/copyFiles.js';
import { deleteFiles } from './cmd/deleteFiles.js';

const runApp = async () => {
  await copyFiles('xlsx/base', 'temp');
  // await deleteFiles('temp');
  runZipper();
};
runApp();
