import yargs from 'yargs';
export declare class Test implements yargs.CommandModule {
    command: string;
    describe: string;
    builder(args: yargs.Argv): yargs.Argv<{
        p: string[];
    } & {
        b: any;
    } & {
        v: boolean;
    } & {
        t: number;
    }>;
    handler(args: yargs.Arguments): Promise<void>;
}
