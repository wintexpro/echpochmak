"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContract = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs_1 = require("fs");
const path_1 = require("path");
const Deploy_1 = require("../Deploy/Deploy");
class BaseContract {
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
        this.address = await Deploy_1.deploy(this.client, this.contractPackage, keys || this.keys, constructorParams, {}, {}, giveGram);
        this.isDeployed = true;
    }
    async complicatedDeploy(constructorParams = {}, constructorHeader = {}, initParams = {}, giveGram = true, keys) {
        this.address = await Deploy_1.deploy(this.client, this.contractPackage, keys || this.keys, constructorParams, constructorHeader, initParams, giveGram);
        this.isDeployed = true;
    }
    async runWithMessage(functionName, input, keyPair) {
        if (!this.isDeployed) {
            throw new Error('Contract not deployed');
        }
        if (!keyPair) {
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
        if (!keyPair) {
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
        if (!keyPair) {
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
exports.BaseContract = BaseContract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUNvbnRyYWN0T2JqZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0Jhc2VDb250cmFjdE9iamVjdC9CYXNlQ29udHJhY3RPYmplY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQXVEO0FBQ3ZELDJCQUFrQztBQUNsQywrQkFBK0I7QUFDL0IsNkNBQTBDO0FBRTFDLE1BQXNCLFlBQVk7SUFRaEMsWUFDRSxZQUFvQixFQUNwQixPQUFlLEVBQ2YsTUFBTSxFQUNOLElBQVMsRUFDVCxNQUFNLEdBQUcsS0FBSztRQVZULGVBQVUsR0FBRyxLQUFLLENBQUM7UUFZeEIsMEJBQTBCO1FBQzFCLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsTUFBTSxJQUFJLEdBQUcsaUJBQVksQ0FBQyxjQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNqRCwrQkFBK0I7WUFDL0IsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7UUFFRCw4REFBOEQ7UUFDOUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLGNBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7SUFDMUIsQ0FBQztJQUVNLEtBQUssQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxFQUFFLFFBQVEsR0FBRyxJQUFJLEVBQUUsSUFBSztRQUN4RSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sZUFBTSxDQUN6QixJQUFJLENBQUMsTUFBTSxFQUNYLElBQUks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