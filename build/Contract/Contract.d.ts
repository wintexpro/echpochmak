export declare class Contract {
    contractPackage: any;
    contractPath: string;
    isDeployed: boolean;
    address: any;
    private client;
    private keys;
    constructor(contractPath: string, abiPath: string, client: any, keys: any, noPath?: boolean);
    deployContract(constructorParams?: {}, giveGram?: boolean, keys?: any): Promise<void>;
    runWithMessage(functionName: any, input: any, keyPair?: any): Promise<any>;
    runLocal(functionName: any, input: any, keyPair?: any): Promise<any>;
    futureAddress(): Promise<any>;
    runContract(functionName: any, input: any, keyPair?: any): Promise<any>;
}
