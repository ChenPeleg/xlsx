import { runZipper } from './archive/zipper.js';
import { copyFiles } from './cmd/copyFiles.js';

const runApp = () => {
  copyFiles('xlsx/base', 'temp');
  runZipper();
};
runApp();
