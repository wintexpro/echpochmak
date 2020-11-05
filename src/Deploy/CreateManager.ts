import { TONClient } from 'ton-client-node-js';
import { Contract } from '../Contract/Contract';
import { resolve, parse } from 'path';
import { GiveGrams } from '../Deploy/Deploy';
export default class Manager {
  public client: any;
  public contracts = {};
  public keys: any;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  public async CreateClient(servers: string[] = ['net.ton.dev']) {
    this.client = await TONClient.create({
      servers,
      // other configuration parameters, read below
    });
  }

  public async createKeys() {
    this.keys = await this.client.crypto.ed25519Keypair();
  }

  public setKeys(secret: string, _public: string) {
    this.keys = {
      secret,
      public: _public,
    };
  }
  public async GiveToAddress(address) {
    await GiveGrams(this.client, address);
  }
  public loadContract(contractPath: string, abiPath: string) {
    if (!this.keys) {
      throw new Error('Keys not created');
    }
    if (!this.client) {
      throw new Error('Client not created');
    }
    this.contracts[parse(contractPath).base.split('.')[0]] = new Contract(
      resolve(contractPath),
      resolve(abiPath),
      this.client,
      this.keys
    );
  }

  public AddContractFromAddress(
    address: string,
    abiPath: string,
    contractName: string
  ) {
    if (!this.keys) {
      throw new Error('Keys not created');
    }
    if (!this.client) {
      throw new Error('Client not created');
    }
    const contract = new Contract(
      null,
      resolve(abiPath),
      this.client,
      this.keys,
      true
    );
    contract.address = address;
    contract.isDeployed = true;
    this.contracts[contractName] = contract;
  }
}
