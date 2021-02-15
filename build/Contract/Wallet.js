"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const Deploy_1 = require("../Deploy/Deploy");
class Wallet {
    async deploy(keys) {
        try {
            this.address = await Deploy_1.deploy(this.client, this.contractPackage, keys || this.keys, {}, {}, {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbnRyYWN0L1dhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBa0M7QUFDbEMsK0JBQTRCO0FBQzVCLDZDQUEwQztBQUMxQyxNQUFhLE1BQU07SUFRVixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUs7UUFDdkIsSUFBSTtZQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxlQUFNLENBQ3pCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQ2pCLEVBQUUsRUFDRixFQUFFLEVBQ0YsRUFBRSxDQUNILENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztTQUN4QjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBQ00sS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFZLEVBQUUsS0FBYSxFQUFFLE1BQWU7UUFDdkUsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO2dCQUMvQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUc7Z0JBQzdCLFlBQVksRUFBRSxpQkFBaUI7Z0JBQy9CLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFO2dCQUM5QixPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUk7YUFDbkIsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxRQUFRLENBQUMsTUFBTSxDQUFDO1NBQ3hCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUMxQztJQUNILENBQUM7SUFFTSxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ3BDLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDM0M7UUFDRCwwQkFBMEI7UUFDMUIsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLGlCQUFZLENBQ3ZCLFdBQUksQ0FBQyxTQUFTLEVBQUUsaUNBQWlDLENBQUMsQ0FDbkQsQ0FBQztRQUNGLCtCQUErQjtRQUMvQixXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV0Qyw4REFBOEQ7UUFDOUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLFdBQUksQ0FDdEIsU0FBUyxFQUNULHNDQUFzQyxDQUN2QyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ25CLENBQUM7Q0FDRjtBQWhFRCx3QkFnRUMifQ==