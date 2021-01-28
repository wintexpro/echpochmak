"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const Deploy_1 = require("../Deploy/Deploy");
class Wallet {
    async deploy(keys) {
        try {
            this.address = await Deploy_1.deploy(this.client, this.contractPackage, keys || this.keys, {}, {});
            this.isDeployed = true;
        }
        catch (err) {
            console.log(err);
            throw new Error('Terminated with error');
        }
    }
    async sendTransaction(dest, value, bounce) {
        if (!this.isDeployed) {
            throw new Error('Contract not deployed');
        }
        try {
            const response = await this.client.contracts.run({
                address: this.address,
                abi: this.contractPackage.abi,
                functionName: 'sendTransaction',
                input: { dest, value, bounce },
                keyPair: this.keys,
            });
            return response.output;
        }
        catch (err) {
            console.log(err);
            throw new Error('Terminated with error');
        }
    }
    async createWallet(client, keys) {
        if (this.isDeployed) {
            throw new Error('Wallet already created');
        }
        // read contract .tvc file
        let imageBase64 = '';
        const buff = fs_1.readFileSync(path_1.join(__dirname, '../WalletContract/10_Wallet.tvc'));
        // convert tvc code into base64
        imageBase64 = buff.toString('base64');
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const abi = require(path_1.join(__dirname, '../WalletContract/10_Wallet.abi.json'));
        this.contractPackage = { abi, imageBase64 };
        this.client = client;
        this.keys = keys;
    }
}
exports.Wallet = Wallet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbnRyYWN0L1dhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBa0M7QUFDbEMsK0JBQTRCO0FBQzVCLDZDQUEwQztBQUMxQyxNQUFhLE1BQU07SUFRVixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUs7UUFDdkIsSUFBSTtZQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxlQUFNLENBQ3pCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQ2pCLEVBQUUsRUFDRixFQUFFLENBQ0gsQ0FBQztZQUNGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7SUFDTSxLQUFLLENBQUMsZUFBZSxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsTUFBZTtRQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7Z0JBQy9DLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsR0FBRyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRztnQkFDN0IsWUFBWSxFQUFFLGlCQUFpQjtnQkFDL0IsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUU7Z0JBQzlCLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSTthQUNuQixDQUFDLENBQUM7WUFDSCxPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUM7U0FDeEI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUk7UUFDcEMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLENBQUMsQ0FBQztTQUMzQztRQUNELDBCQUEwQjtRQUMxQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsTUFBTSxJQUFJLEdBQUcsaUJBQVksQ0FDdkIsV0FBSSxDQUFDLFNBQVMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUNuRCxDQUFDO1FBQ0YsK0JBQStCO1FBQy9CLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXRDLDhEQUE4RDtRQUM5RCxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBSSxDQUN0QixTQUFTLEVBQ1Qsc0NBQXNDLENBQ3ZDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBL0RELHdCQStEQyJ9