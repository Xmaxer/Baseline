import { readTypescriptConfig } from '@src/utils/configReader';
import exec from '@src/utils/exec';
import * as path from 'path';

export async function executeTypescript(): Promise<boolean> {
  console.log('Executing Typescript...');
  let command = `tsc`;
  const configExists = readTypescriptConfig();
  if (!configExists) {
    command += ` --project ${path.join(__dirname, '../../tsconfig.json')}`;
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
