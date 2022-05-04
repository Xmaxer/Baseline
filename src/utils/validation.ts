import {
  readEsLintConfig,
  readLockfile,
  readPrettierConfig,
  readTypescriptConfig,
} from '@src/utils/configReader';
import * as path from 'path';
import git from 'simple-git';

export function validateEsLint() {
  console.log('Validating ESLint config...');
  const existingConfig = readEsLintConfig();
  if (existingConfig) {
    if (
      !existingConfig.extends?.includes('@baselinecode/eslint-config-baseline')
    ) {
      console.error(
        "ESLint config is missing baseline extension. Include @baselinecode/eslint-config-baseline in your eslint config 'extends'.",
      );
      process.exit(1);
    }
  }
  return true;
}

export function validateTypescript() {
  console.log('Validating Typescript config...');
  const tsConfig = readTypescriptConfig();
  if (tsConfig) {
    if (
      !tsConfig.extends?.includes(
        './node_modules/@baselinecode/baseline/tsconfig.json',
      )
    ) {
      console.error(
        "Typescript config is missing baseline extension. Include @baselinecode/baseline/tsconfig.json in your tsconfig 'extends'.",
      );
      process.exit(1);
    }
  }
  return true;
}

export function validatePrettier() {
  console.log('Validating Prettier config...');
  const prettierConfig = readPrettierConfig();
  if (prettierConfig) {
    if (
      !prettierConfig.extends?.includes(
        '@baselinecode/baseline/baseConfigs/.prettierrc.js',
      )
    ) {
      console.error(
        "Prettier config is missing baseline extension. Include @baselinecode/baseline/baseConfigs/.prettierrc.js in your prettier config via ...require('@baseline/baseline/baseConfigs/.prettierrc.js').",
      );
      process.exit(1);
    }
  }
  return true;
}

export async function validateLockfileChanges() {
  console.log('Validating lockfile changes...');
  const lockfile = readLockfile();
  if (lockfile && (await hasGit())) {
    const modifiedFiles = (await git().status()).modified;
    if (
      modifiedFiles.includes('package-lock.json') ||
      modifiedFiles.includes('yarn.lock') ||
      modifiedFiles.includes('pnpm-lock.yaml')
    ) {
      console.warn(
        `You have modified ${path.basename(
          lockfile,
        )}. Make sure that's intentional!`,
      );
    }
  }
}

export function hasGit(): Promise<boolean> {
  return git()
    .checkIsRepo()
    .then(() => true)
    .catch(() => false);
}
