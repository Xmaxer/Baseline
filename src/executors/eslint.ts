import { readEsLintConfig, readEslintIgnore } from '@src/utils/configReader';
import exec from '@src/utils/exec';
import * as path from 'path';

export async function executeLint(readonly: boolean): Promise<boolean> {
  console.log('Executing ESLint...');
  const eslintConfig = readEsLintConfig();
  const eslintIgnore = readEslintIgnore();
  let command = `eslint . --ext .js,.jsx,.ts,.tsx --max-warnings 0`;
  if (!readonly) {
    command += ' --fix';
  }
  if (!eslintIgnore) {
    command += ` --ignore-path ${path.join(
      __dirname,
      '../baseConfigs/.eslintignore',
    )}`;
  } else {
    console.log('ESlint ignore file found. Not adding default ignore paths.');
  }
  if (!eslintConfig) {
    command += ` --config ${path.join(
      __dirname,
      '../baseConfigs/.eslintrc.js',
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
