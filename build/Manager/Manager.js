"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const ton_client_node_js_1 = require("ton-client-node-js");
const Contract_1 = require("../Contract/Contract");
const path_1 = require("path");
const Deploy_1 = require("../Deploy/Deploy");
const Wallet_1 = require("../Contract/Wallet");
const Helpers_1 = require("./Helpers");
class Manager {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
        this.contracts = {};
        this.helpers = new Helpers_1.Helpers();
    }
    async createClient(servers = ['net.ton.dev']) {
        this.client = await new Promise(async function (resolve) {
            while (true) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                try {
                    const client = await ton_client_node_js_1.TONClient.create({
                        servers,
                        log_verbose: globalThis.verbose,
                        err_log_verbose: false,
                    });
                    await client.queries.serverInfo.version;
                    resolve(client);
                    break;
                }
                catch (error) {
                    console.log(error);
                }
            }
        });
        while (true) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const block = await this.findLastBlock(0, this.client, 'id');
            if (block) {
                break;
            }
        }
    }
    async findLastBlock(chain, client, result, additionalFilter) {
        const blocks = await client.queries.blocks.query({
            filter: Object.assign({ workchain_id: { eq: chain } }, (additionalFilter || {})),
            result,
            orderBy: [
                {
                    path: 'seq_no',
                    direction: 'DESC',
                },
            ],
            limit: 1,
        });
        return blocks.length > 0 ? blocks[0] : null;
    }
    async createKeysAndReturn() {
        return await this.client.crypto.ed25519Keypair();
    }
    async giveToAddress(address, amount) {
        await Deploy_1.giveGrams(this.client, address, amount);
    }
    async loadContract(contractPath, abiPath, options) {
        if (!this.client) {
            throw new Error('Client not created');
        }
        const contract = new Contract_1.Contract(path_1.resolve(contractPath), path_1.resolve(abiPath), this.client, (options === null || options === void 0 ? void 0 : options.keys) || (await this.createKeysAndReturn()));
        contract.address = await contract.futureAddress();
        this.contracts[(options === null || options === void 0 ? void 0 : options.contractName) || path_1.parse(contractPath).base.split('.')[0]] = contract;
    }
    async createWallet(keys) {
        const wallet = new Wallet_1.Wallet();
        wallet.createWallet(this.client, keys || (await this.createKeysAndReturn()));
        return wallet;
    }
    async addContractFromAddress(address, abiPath, contractName, keyPair) {
        if (!this.client) {
            throw new Error('Client not created');
        }
        const contract = new Contract_1.Contract(null, path_1.resolve(abiPath), this.client, keyPair || (await this.createKeysAndReturn()), true);
        contract.address = address;
        let _contract;
        try {
            _contract = await this.client.queries.accounts.query({
                id: { eq: address },
            }, 'id');
        }
        catch (error) {
            console.log(error);
        }
        contract.isDeployed = _contract.length > 0 ? true : false;
        if (!contract.isDeployed)
            throw new Error('Contract not deployed');
        this.contracts[contractName] = contract;
    }
}
exports.Manager = Manager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NYW5hZ2VyL01hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkRBQStDO0FBQy9DLG1EQUFnRDtBQUNoRCwrQkFBc0M7QUFDdEMsNkNBQTZDO0FBQzdDLCtDQUE0QztBQUM1Qyx1Q0FBb0M7QUFDcEMsTUFBYSxPQUFPO0lBSWxCLGdFQUFnRTtJQUNoRTtRQUhPLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixZQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7SUFFaEIsQ0FBQztJQUNULEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBb0IsQ0FBQyxhQUFhLENBQUM7UUFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDLEtBQUssV0FBVyxPQUFPO1lBQ3JELE9BQU8sSUFBSSxFQUFFO2dCQUNYLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUQsSUFBSTtvQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLDhCQUFTLENBQUMsTUFBTSxDQUFDO3dCQUNwQyxPQUFPO3dCQUNQLFdBQVcsRUFBRSxVQUFVLENBQUMsT0FBTzt3QkFDL0IsZUFBZSxFQUFFLEtBQUs7cUJBQ3ZCLENBQUMsQ0FBQztvQkFDSCxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztvQkFDeEMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNoQixNQUFNO2lCQUNQO2dCQUFDLE9BQU8sS0FBSyxFQUFFO29CQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3BCO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxFQUFFO1lBQ1gsTUFBTSxJQUFJLE9BQU8sQ0FB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