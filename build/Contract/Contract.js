"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const Deploy_1 = require("../Deploy/Deploy");
class Contract {
    constructor(contractPath, abiPath, client, keys, noPath = false) {
        this.isDeployed = false;
        // read contract .tvc file
        let imageBase64 = '';
        if (!noPath) {
            const buff = fs_1.readFileSync(path_1.resolve(contractPath));
            // convert tvc code into base64
            imageBase64 = buff.toString('base64');
        }
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const abi = require(path_1.resolve(abiPath));
        this.contractPackage = { abi, imageBase64 };
        this.client = client;
        this.keys = keys;
        this.isDeployed = false;
    }
    async deployContract(constructorParams = {}, giveGram = true, keys) {
        this.address = await Deploy_1.deploy(this.client, this.contractPackage, keys || this.keys, constructorParams, giveGram);
        this.isDeployed = true;
    }
    async runWithMessage(functionName, input, keyPair) {
        if (!this.isDeployed) {
            throw new Error('Contract not deployed');
        }
        if (keyPair == undefined) {
            keyPair = this.keys;
        }
        const runMessage = await this.client.contracts.createRunMessage({
            address: this.address,
            abi: this.contractPackage.abi,
            functionName,
            input,
            keyPair,
        });
        const messageProcessingState = await this.client.contracts.sendMessage(runMessage.message);
        const result = await this.client.contracts.waitForRunTransaction(runMessage, messageProcessingState);
        return result;
    }
    async runLocal(functionName, input, keyPair) {
        if (!this.isDeployed) {
            throw new Error('Contract not deployed');
        }
        if (keyPair == undefined) {
            keyPair = this.keys;
        }
        const response = await this.client.contracts.runLocal({
            address: this.address,
            abi: this.contractPackage.abi,
            functionName,
            input,
            keyPair,
        });
        return response;
    }
    async futureAddress() {
        const futureAddress = (await this.client.contracts.getDeployData({
            abi: this.contractPackage.abi,
            imageBase64: this.contractPackage.imageBase64,
            publicKeyHex: this.keys.public,
        })).address;
        return futureAddress;
    }
    async runContract(functionName, input, keyPair) {
        if (!this.isDeployed) {
            throw new Error('Contract not deployed');
        }
        if (keyPair == undefined) {
            keyPair = this.keys;
        }
        const response = await this.client.contracts.run({
            address: this.address,
            abi: this.contractPackage.abi,
            functionName: functionName,
            input: input,
            keyPair: keyPair,
        });
        return response.output;
    }
}
exports.Contract = Contract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29udHJhY3QvQ29udHJhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQWtDO0FBQ2xDLCtCQUErQjtBQUMvQiw2Q0FBMEM7QUFFMUMsTUFBYSxRQUFRO0lBUW5CLFlBQ0UsWUFBb0IsRUFDcEIsT0FBZSxFQUNmLE1BQU0sRUFDTixJQUFTLEVBQ1QsTUFBTSxHQUFHLEtBQUs7UUFWVCxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBWXhCLDBCQUEwQjtRQUMxQixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNYLE1BQU0sSUFBSSxHQUFHLGlCQUFZLENBQUMsY0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDakQsK0JBQStCO1lBQy9CLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsOERBQThEO1FBQzlELE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFDTSxLQUFLLENBQUMsY0FBYyxDQUFDLGlCQUFpQixHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsSUFBSSxFQUFFLElBQUs7UUFDeEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLGVBQU0sQ0FDekIsSUFBSSxDQUFDLE1BQU0sRUFDWCxJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFD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