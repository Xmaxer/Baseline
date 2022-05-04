import { exec as originalExec } from 'child_process';
import * as util from 'util';

const exec = util.promisify(originalExec);

export default exec;
