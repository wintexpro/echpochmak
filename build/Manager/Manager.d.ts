import { Wallet } from '../Contract/Wallet';
import { Helpers } from './Helpers';
import { BaseContract } from '../BaseContractObject/BaseContractObject';
interface ContractMap {
    [key: string]: BaseContract;
}
export declare class Manager {
    client: any;
    contracts: ContractMap | any;
    helpers: Helpers;
    constructor();
    createClient(servers?: string[]): Promise<void>;
    findLastBlock(chain: number, client: any, result: string, additionalFilter?: any): Promise<any>;
    createKeysAndReturn(): Promise<any>;
    giveToAddress(address: any, amount?: number): Promise<void>;
    loadContract(contractPath: string, abiPath: string, options?: loadOptions): Promise<void>;
    createWallet(keys?: any): Promise<Wallet>;
    addCustomContract(contract: BaseContract, contractName: string): void;
    addContractFromAddress(address: string, abiPath: string, contractName: string, keyPair?: any): Promise<void>;
}
export interface loadOptions {
    keys?: any;
    contractName?: string;
}
export {};
