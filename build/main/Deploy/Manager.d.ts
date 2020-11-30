import { Wallet } from '../Contract/Wallet';
export default class Manager {
    client: any;
    contracts: {};
    keys: any;
    constructor();
    createClient(servers?: string[]): Promise<void>;
    createKeys(): Promise<void>;
    findLastBlock(chain: number, client: any, result: string, additionalFilter?: any): Promise<any>;
    createKeysAndReturn(): Promise<any>;
    setKeys(secret: string, _public: string): void;
    giveToAddress(address: any, amount?: number): Promise<void>;
    loadContract(contractPath: string, abiPath: string, contractName?: string): void;
    createWallet(keys?: any): Promise<Wallet>;
    addContractFromAddress(address: string, abiPath: string, contractName: string, keyPair?: any): Promise<void>;
}
