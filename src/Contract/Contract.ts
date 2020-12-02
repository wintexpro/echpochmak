import { readFileSync } from 'fs';
import { resolve } from 'path';
import { deploy } from '../Deploy/Deploy';

export class Contract {
  public contractPackage: any;
  public contractPath: string;
  public isDeployed = false;
  public address: any;
  private client: any;
  private keys: any;

  constructor(
    contractPath: string,
    abiPath: string,
    client,
    keys: any,
    noPath = false
  ) {
    // read contract .tvc file
    let imageBase64 = '';
    if (!noPath) {
      const buff = readFileSync(resolve(contractPath));
      // convert tvc code into base64
      imageBase64 = buff.toString('base64');
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const abi = require(resolve(abiPath));
    this.contractPackage = { abi, imageBase64 };
    this.client = client;
    this.keys = keys;
    this.isDeployed = false;
  }
  public async deployContract(constructorParams = {}, giveGram = true, keys?) {
    this.address = await deploy(
      this.client,
      this.contractPackage,
      keys || this.keys,
      constructorParams,
      giveGram
    );
    this.isDeployed = true;
  }

  public async runWithMessage(functionName, input, keyPair?) {
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
    const messageProcessingState = await this.client.contracts.sendMessage(
      runMessage.message
    );
    const result = await this.client.contracts.waitForRunTransaction(
      runMessage,
      messageProcessingState
    );
    return result;
  }

  public async runLocal(functionName, input, keyPair?) {
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

  public async futureAddress() {
    const futureAddress = (
      await this.client.contracts.getDeployData({
        abi: this.contractPackage.abi,
        imageBase64: this.contractPackage.imageBase64,
        publicKeyHex: this.keys.public,
      })
    ).address;
    return futureAddress;
  }
  public async runContract(functionName, input, keyPair?) {
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
      keyPair: keyPair, //there is no pubkey key check in the contract so we can leave it empty
    });
    return response.output;
  }
}
