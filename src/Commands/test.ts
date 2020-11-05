import yargs from 'yargs';
import { testConfig } from '../config/config';
import { TestRun } from '../TestRunner/TestRunner';
export class Test implements yargs.CommandModule {
  public command = 'test';
  public describe = 'Run tests';

  public builder(args: yargs.Argv) {
    return args
      .option('p', {
        alias: 'path',
        type: 'string',
        default: './test/',
        array: true,
        required: false,
        describe: 'Path to test folder',
      })
      .option('b', {
        alias: 'bail',
        type: 'boolean',
        required: false,
        default: null,
        describe: 'Enable bail',
      })
      .option('v', {
        alias: 'verbose',
        type: 'boolean',
        required: false,
        default: false,
        describe: 'Wite debug info',
      })
      .option('t', {
        alias: 'timeout',
        type: 'number',
        required: false,
        default: 0,
        describe: 'Timeout time for test',
      });
  }

  public async handler(args: yargs.Arguments) {
    TestRun(
      new testConfig(
        args.p as string[],
        args.b as boolean,
        args.t as number,
        null,
        args.v as boolean
      )
    );
  }
}
