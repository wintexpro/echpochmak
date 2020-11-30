import { Wallet } from '../Contract/Wallet';
import { Helpers } from './Helpers';
export declare class Manager {
    client: any;
    contracts: {};
    helpers: Helpers;
    constructor();
    createClient(servers?: string[]): Promise<void>;
    findLastBlock(chain: number, client: any, result: string, additionalFilter?: any): Promise<any>;
    createKeysAndReturn(): Promise<any>;
    giveToAddress(address: any, amount?: number): Promise<void>;
    loadContract(contractPath: string, abiPath: string, options?: loadOptions): Promise<void>;
    createWallet(keys?: any): Promise<Wallet>;
    addContractFromAddress(address: string, abiPath: string, contractName: string, keyPair?: any): Promise<void>;
}
export interface loadOptions {
    keys?: any;
    contractName?: string;
}
