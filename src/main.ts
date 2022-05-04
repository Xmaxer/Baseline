#! /usr/bin/env node
import { executeLint } from '@src/executors/eslint';
import { executePrettier } from '@src/executors/prettier';
import { executeTypescript } from '@src/executors/typescript';
import {
  validateEsLint,
  validateLockfileChanges,
  validatePrettier,
  validateTypescript,
} from '@src/utils/validation';
import { Command } from 'commander';

const program = new Command();

program
  .name('baseline')
  .version('0.0.1')
  .option('-r, --read', 'Run in read only mode, useful in CI.');
program.parse(process.argv);

const options = program.opts();

console.log(
  `Running Baseline in ${options.read ? 'read only' : 'write'} mode.`,
);

async function baseline() {
  validateEsLint();
  validateTypescript();
  validatePrettier();
  await validateLockfileChanges();
  const executions = [
    await executeLint(options.read),
    await executePrettier(options.read),
    await executeTypescript(),
  ];

  if (executions.some((e) => !e)) {
    console.error('Baseline failed. Check above for errors.');
    process.exit(1);
  }
}

baseline();
