import { MochaOptions } from 'mocha';
export declare class testConfig {
    mocha: MochaOptions;
    bail: boolean;
    verbose: boolean;
    timeout: number;
    testingFiles: string[];
    colors?: boolean;
    constructor(filesPath: string[], bail?: boolean, timeout?: number, colors?: boolean, verbose?: boolean);
}
