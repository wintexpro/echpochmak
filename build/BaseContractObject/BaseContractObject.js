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
        this.address = await Deploy_1.deploy(this.client, this.contractPackage, keys || this.keys, constructorParams, giveGram);
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