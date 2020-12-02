import { Contract } from '../Contract/Contract';
export declare class Helpers {
    static deployCheck(address: any, client: any): Promise<void>;
    static getAccountBalance(address: any, client: any): Promise<number>;
    static hasOnBounced(address: any, timestamp: number, client: any): Promise<void>;
    static lastTransaction(address: any, client: any, fields?: string): Promise<any>;
    static lastMessage(address: any, client: any, fields?: string): Promise<any>;
    static balanceHasChanged(address: any, client: any, oldValue: any, type: hasChangedValue): Promise<void>;
    static getRunFees(contract: Contract, functionName: any, input: any, client: any, keyPair: any): Promise<any>;
    static getDeployFees(contract: Contract, constructorParams: any, newAccount: boolean, client: any, keyPair: any): Promise<any>;
}
export declare enum hasChangedValue {
    big = 0,
    small = 1
}
