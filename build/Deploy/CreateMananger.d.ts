import { Contract } from '../Contract/Contract';
export declare class Manager {
    client: any;
    contracts: [{
        key: string;
        value: Contract;
    }];
    keys: any;
    constructor();
    CreateClient(servers?: string[]): Promise<void>;
    createKeys(): Promise<void>;
    setKeys(secret: string, _public: string): void;
    loadContract(contractPath: string, abiPath: string): void;
    AddContractFromAddress(address: string, abiPath: string, contractName: string): void;
}
