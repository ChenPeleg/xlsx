import child_process from 'child_process';

child_process.execSync(`zip -r <DESIRED_NAME_OF_ZIP_FILE_HERE> *`, {
  cwd: '<PATH_TO_FOLDER_YOU_WANT_ZIPPED_HERE>',
});

export const runZipper = () => {};
