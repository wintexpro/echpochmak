"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ton_client_node_js_1 = require("ton-client-node-js");
const Contract_1 = require("../Contract/Contract");
const path_1 = require("path");
const Deploy_1 = require("./Deploy");
const Wallet_1 = require("../Contract/Wallet");
class Manager {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
        this.contracts = {};
    }
    async createClient(servers = ['net.ton.dev']) {
        this.client = await new Promise(async function (resolve) {
            while (true) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                try {
                    const client = await ton_client_node_js_1.TONClient.create({
                        servers,
                        log_verbose: globalThis.verbose,
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
    async createKeys() {
        this.keys = await this.client.crypto.ed25519Keypair();
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
    setKeys(secret, _public) {
        this.keys = {
            secret,
            public: _public,
        };
    }
    async giveToAddress(address, amount) {
        await Deploy_1.giveGrams(this.client, address, amount);
    }
    loadContract(contractPath, abiPath, contractName) {
        if (!this.keys) {
            throw new Error('Keys not created');
        }
        if (!this.client) {
            throw new Error('Client not created');
        }
        this.contracts[contractName || path_1.parse(contractPath).base.split('.')[0]] = new Contract_1.Contract(path_1.resolve(contractPath), path_1.resolve(abiPath), this.client, this.keys);
    }
    async createWallet(keys) {
        const wallet = new Wallet_1.Wallet();
        wallet.createWallet(this.client, keys || this.keys);
        return wallet;
    }
    async addContractFromAddress(address, abiPath, contractName, keyPair) {
        if (!this.keys) {
            throw new Error('Keys not created');
        }
        if (!this.client) {
            throw new Error('Client not created');
        }
        const contract = new Contract_1.Contract(null, path_1.resolve(abiPath), this.client, keyPair || this.keys, true);
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
exports.default = Manager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9EZXBsb3kvTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUErQztBQUMvQyxtREFBZ0Q7QUFDaEQsK0JBQXNDO0FBQ3RDLHFDQUFxQztBQUNyQywrQ0FBNEM7QUFDNUMsTUFBcUIsT0FBTztJQUkxQixnRUFBZ0U7SUFDaEU7UUFITyxjQUFTLEdBQUcsRUFBRSxDQUFDO0lBR1AsQ0FBQztJQUNULEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBb0IsQ0FBQyxhQUFhLENBQUM7UUFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksT0FBTyxDQUFDLEtBQUssV0FBVyxPQUFPO1lBQ3JELE9BQU8sSUFBSSxFQUFFO2dCQUNYLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDMUQsSUFBSTtvQkFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLDhCQUFTLENBQUMsTUFBTSxDQUFDO3dCQUNwQyxPQUFPO3dCQUNQLFdBQVcsRUFBRSxVQUFVLENBQUMsT0FBTztxQkFDaEMsQ0FBQyxDQUFDO29CQUNILE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDO29CQUN4QyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2hCLE1BQU07aUJBQ1A7Z0JBQUMsT0FBTyxLQUFLLEVBQUU7b0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDcEI7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLEVBQUU7WUFDWCxNQUFNLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFD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