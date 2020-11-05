import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Deploy } from '../Deploy/Deploy';

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

    const abi = readFileSync(resolve(abiPath));
    this.contractPackage = { abi, imageBase64 };
    this.client = client;
    this.keys = keys;
  }
  public async DeployContract() {
    this.address = await Deploy(this.client, this, this.keys);
    this.isDeployed = true;
  }
  public async RunContract(functionName, input, keyPair) {
    if (!this.isDeployed) {
      throw new Error('Contract not deployed');
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
}
