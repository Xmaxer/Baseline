import { EslintConfig } from '@src/interfaces/eslint';
import * as fs from 'fs';
import * as path from 'path';

export function readEsLintConfig(): EslintConfig | null {
  const existingESLintConfig = fs.existsSync('./.eslintrc.js');
  if (existingESLintConfig) {
    return require(path.join(process.cwd(), '.eslintrc.js'));
  }
  return null;
}

export function readEslintIgnore(): Array<string> | null {
  const existingEslintIgnore = fs.existsSync('./.eslintignore');
  if (existingEslintIgnore) {
    return fs.readFileSync('./.eslintignore', 'utf8').toString().split('\n');
  }
  return null;
}

export function readTypescriptConfig() {
  const existingTypescriptConfig = fs.existsSync('./tsconfig.json');
  if (existingTypescriptConfig) {
    return require(path.join(process.cwd(), 'tsconfig.json'));
  }
  return null;
}

export function readPrettierConfig() {
  const existingPrettierConfig = fs.existsSync('./.prettierrc.js');
  if (existingPrettierConfig) {
    return require(path.join(process.cwd(), '.prettierrc.js'));
  }
  return null;
}

export function readPrettierIgnore(): Array<string> | null {
  const existingEslintIgnore = fs.existsSync('./.prettierignore');
  if (existingEslintIgnore) {
    return fs.readFileSync('./.prettierignore', 'utf8').toString().split('\n');
  }
  return null;
}

export function readLockfile() {
  const existingNpmLock = fs.existsSync('./package-lock.json');
  const existingYarnLock = fs.existsSync('./yarn.lock');
  const existingPnpmLock = fs.existsSync('./pnpm-lock.yaml');

  if (existingNpmLock) {
    return path.join(process.cwd(), 'package-lock.json');
  } else if (existingYarnLock) {
    return path.join(process.cwd(), 'yarn.lock');
  } else if (existingPnpmLock) {
    return path.join(process.cwd(), 'pnpm-lock.yaml');
  }
  return null;
}
