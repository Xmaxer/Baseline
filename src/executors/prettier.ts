import {
  readPrettierConfig,
  readPrettierIgnore,
} from '@src/utils/configReader';
import exec from '@src/utils/exec';
import * as path from 'path';

export async function executePrettier(readonly: boolean): Promise<boolean> {
  console.log('Executing prettier...');
  const prettierConfig = readPrettierConfig();
  const prettierIgnore = readPrettierIgnore();
  let command = `prettier`;
  if (readonly) {
    command += ` --check .`;
  } else {
    command += ` --write .`;
  }
  if (!prettierIgnore) {
    command += ` --ignore-path ${path.join(
      __dirname,
      '../baseConfigs/.prettierignore',
    )}`;
  } else {
    console.log('Prettier ignore file found. Not adding default ignore paths.');
  }
  if (!prettierConfig) {
    command += ` --config ${path.join(
      __dirname,
      '../baseConfigs/.prettierrc.js',
    )}`;
  }
  return await exec(command)
    .then(() => {
      return true;
    })
    .catch((err) => {
      if (err.stderr) {
        console.error(err.stderr);
      } else {
        console.error(err.stdout);
      }
      return false;
    });
}
