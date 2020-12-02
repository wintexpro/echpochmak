export declare class Wallet {
    address: string;
    isDeployed: boolean;
    contractPackage: any;
    contractPath: string;
    private client;
    private keys;
    deploy(keys?: any): Promise<void>;
    sendTransaction(dest: string, value: number, bounce: boolean): Promise<any>;
    createWallet(client: any, keys: any): Promise<void>;
}
