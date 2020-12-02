"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const Deploy_1 = require("../Deploy/Deploy");
class Wallet {
    async deploy(keys) {
        try {
            this.address = await Deploy_1.deploy(this.client, this.contractPackage, keys || this.keys, {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2FsbGV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbnRyYWN0L1dhbGxldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQkFBa0M7QUFDbEMsK0JBQTRCO0FBQzVCLDZDQUEwQztBQUMxQyxNQUFhLE1BQU07SUFRVixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUs7UUFDdkIsSUFBSTtZQUNGLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxlQUFNLENBQ3pCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLGVBQWUsRUFDcEIsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQ2pCLEVBQUUsQ0FDSCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDeEI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1NBQzFDO0lBQ0gsQ0FBQztJQUNNLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBWSxFQUFFLEtBQWEsRUFBRSxNQUFlO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztTQUMxQztRQUNELElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztnQkFDL0MsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNyQixHQUFHLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHO2dCQUM3QixZQUFZLEVBQUUsaUJBQWlCO2dCQUMvQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRTtnQkFDOUIsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJO2FBQ25CLENBQUMsQ0FBQztZQUNILE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQztTQUN4QjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBRU0sS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSTtRQUNwQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsMEJBQTBCO1FBQzFCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixNQUFNLElBQUksR0FBRyxpQkFBWSxDQUN2QixXQUFJLENBQUMsU0FBUyxFQUFFLGlDQUFpQyxDQUFDLENBQ25ELENBQUM7UUFDRiwrQkFBK0I7UUFDL0IsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFdEMsOERBQThEO1FBQzlELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxXQUFJLENBQ3RCLFNBQVMsRUFDVCxzQ0FBc0MsQ0FDdkMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0NBQ0Y7QUE5REQsd0JBOERDIn0=