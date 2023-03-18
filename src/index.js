import { runZipper } from './archive/zipper.js';
import { copyFiles } from './cmd/copyFiles.js';

const runApp = async () => {
  await copyFiles('xlsx/base', 'temp');
  runZipper();
};
runApp();
