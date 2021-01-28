import { readFileSync } from 'fs';
import { join } from 'path';
import { deploy } from '../Deploy/Deploy';
export class Wallet {
  public address: string;
  public isDeployed: boolean;
  public contractPackage: any;
  public contractPath: string;
  private client: any;
  private keys: any;

  public async deploy(keys?) {
    try {
      this.address = await deploy(
        this.client,
        this.contractPackage,
        keys || this.keys,
        {},
        {}
      );
      this.isDeployed = true;
    } catch (err) {
      console.log(err);
      throw new Error('Terminated with error');
    }
  }
  public async sendTransaction(dest: string, value: number, bounce: boolean) {
    if (!this.isDeployed) {
      throw new Error('Contract not deployed');
    }
    try {
      const response = await this.client.contracts.run({
        address: this.address,
        abi: this.contractPackage.abi,
        functionName: 'sendTransaction',
        input: { dest, value, bounce },
        keyPair: this.keys, //there is no pubkey key check in the contract so we can leave it empty
      });
      return response.output;
    } catch (err) {
      console.log(err);
      throw new Error('Terminated with error');
    }
  }

  public async createWallet(client, keys) {
    if (this.isDeployed) {
      throw new Error('Wallet already created');
    }
    // read contract .tvc file
    let imageBase64 = '';
    const buff = readFileSync(
      join(__dirname, '../WalletContract/10_Wallet.tvc')
    );
    // convert tvc code into base64
    imageBase64 = buff.toString('base64');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const abi = require(join(
      __dirname,
      '../WalletContract/10_Wallet.abi.json'
    ));
    this.contractPackage = { abi, imageBase64 };
    this.client = client;
    this.keys = keys;
  }
}
