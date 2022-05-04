import { WINDOWS_BASH_PATH } from '../src/utils/constants';
import { exec as originalExec } from 'child_process';
import * as fs from 'fs';
import * as util from 'util';

const exec = util.promisify(originalExec);

let settings = {};

if (process.platform === 'win32') {
  settings = {
    shell: WINDOWS_BASH_PATH,
  };
}

async function build() {
  await exec(
    'rm -rf dist && tsc && tscpaths -p tsconfig.json -s . -o ./dist/baseline && cp -r ./src/baseConfigs ./dist/baseline/src && mv ./dist/baseline/src/baseConfigs/tsconfig.json ./dist/baseline && cp README.md ./dist/baseline',
    settings,
  );

  await exec(
    'mkdir -p ./dist/baseline-eslint && cp ./src/baseConfigs/.eslintrc.js ./dist/baseline-eslint/index.js && cp README.md ./dist/baseline-eslint',
    settings,
  );

  const jsonFile = JSON.parse(fs.readFileSync('./package.json').toString());

  const version = jsonFile.version;
  const author = jsonFile.author;
  const license = jsonFile.license;
  const name = jsonFile.name;
  const bin = jsonFile.bin;
  const dependencies = jsonFile.dependencies;
  const exports = jsonFile.exports;
  const main = jsonFile.main;
  const homepage = jsonFile.homepage;
  const publishConfig = jsonFile.publishConfig;
  const repository = jsonFile.repository;

  fs.writeFileSync(
    './dist/baseline-eslint/package.json',
    JSON.stringify(
      {
        name: '@baselinecode/eslint-config-baseline',
        version,
        author,
        license,
        main: 'index.js',
        homepage,
        repository,
        publishConfig,
      },
      null,
      2,
    ),
  );

  fs.writeFileSync(
    './dist/baseline/package.json',
    JSON.stringify(
      {
        name,
        version,
        author,
        license,
        bin,
        dependencies,
        exports,
        main,
        homepage,
        repository,
        publishConfig,
      },
      null,
      2,
    ),
  );
}

build();
