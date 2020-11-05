import { readdirSync, lstatSync } from 'fs';
import { MochaOptions } from 'mocha';
import { join, resolve } from 'path';

export class testConfig {
  public mocha: MochaOptions;
  public bail: boolean;
  public verbose: boolean;
  public timeout: number;
  public testingFiles: string[];
  public colors?: boolean;
  constructor(
    filesPath: string[],
    bail = false,
    timeout = 0,
    colors = false,
    verbose = false
  ) {
    this.testingFiles = [];
    if (filesPath && filesPath.length > 0) {
      if (lstatSync(filesPath[0]).isDirectory()) {
        filesPath.forEach((path) => {
          this.testingFiles.push(
            ...readdirSync(resolve(path)).map((f) => join(path, f))
          );
        });
      } else if (lstatSync(filesPath[0]).isFile()) {
        this.testingFiles = filesPath.map((f) => resolve(f));
      }
    } else {
      throw new Error('No files for test');
    }
    this.bail = bail;
    this.verbose = verbose;
    this.timeout = timeout;
    this.colors = colors;
  }
}
