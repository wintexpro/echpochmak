"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const ton_client_node_js_1 = require("ton-client-node-js");
const Contract_1 = require("../Contract/Contract");
const path_1 = require("path");
class Manager {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    async CreateClient(servers = ['net.ton.dev']) {
        this.client = await ton_client_node_js_1.TONClient.create({
            servers,
        });
    }
    async createKeys() {
        this.keys = await this.client.crypto.ed25519Keypair();
    }
    setKeys(secret, _public) {
        this.keys = {
            secret,
            public: _public,
        };
    }
    loadContract(contractPath, abiPath) {
        if (!this.keys) {
            throw new Error('Keys not created');
        }
        if (!this.client) {
            throw new Error('Client not created');
        }
        this.contracts.push({
            key: path_1.parse(contractPath).base.split('.')[0],
            value: new Contract_1.Contract(path_1.resolve(contractPath), path_1.resolve(abiPath), this.client, this.keys),
        });
    }
    AddContractFromAddress(address, abiPath, contractName) {
        if (!this.keys) {
            throw new Error('Keys not created');
        }
        if (!this.client) {
            throw new Error('Client not created');
        }
        const contract = new Contract_1.Contract(null, path_1.resolve(abiPath), this.client, this.keys, true);
        contract.address = address;
        contract.isDeployed = true;
        this.contracts.push({ key: contractName, value: contract });
    }
}
exports.Manager = Manager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3JlYXRlTWFuYW5nZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvRGVwbG95L0NyZWF0ZU1hbmFuZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJEQUErQztBQUMvQyxtREFBZ0Q7QUFDaEQsK0JBQXNDO0FBRXRDLE1BQWEsT0FBTztJQUlsQixnRUFBZ0U7SUFDaEUsZ0JBQWUsQ0FBQztJQUNULEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBb0IsQ0FBQyxhQUFhLENBQUM7UUFDM0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLDhCQUFTLENBQUMsTUFBTSxDQUFDO1lBQ25DLE9BQU87U0FFUixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVU7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFTSxPQUFPLENBQUMsTUFBYyxFQUFFLE9BQWU7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRztZQUNWLE1BQU07WUFDTixNQUFNLEVBQUUsT0FBTztTQUNoQixDQUFDO0lBQ0osQ0FBQztJQUVNLFlBQVksQ0FBQyxZQUFvQixFQUFFLE9BQWU7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDdkM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNsQixHQUFHLEVBQUUsWUFBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLEtBQUssRUFBRSxJQUFJLG1CQUFRLENBQ2pCLGNBQU8sQ0FBQyxZQUFZLENBQUMsRUFDckIsY0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUNoQixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUksQ0FBQyxJQUFJLENBQ1Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sc0JBQXNCLENBQzNCLE9BQWUsRUFDZixPQUFlLEVBQ2YsWUFBb0I7UUFFcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDdkM7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLG1CQUFRLENBQzNCLElBQUksRUFDSixjQUFPLENBQUMsT0FBTyxDQUFDLEVBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLElBQUksRUFDVCxJQUFJLENBQ0wsQ0FBQztRQUNGLFFBQVEsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQzNCLFFBQVEsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0Y7QUFoRUQsMEJBZ0VDIn0=