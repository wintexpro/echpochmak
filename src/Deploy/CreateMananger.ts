const { TONClient } = require('ton-client-node-js');
import { Contract } from '../Contract/Contract';
import { resolve, parse } from 'path'

export class Manager {
  public client: any;
  public contracts: [{ key: string, value: Contract }];
  public keys: any;

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
    }
  }

  public loadContract(contractPath: string, abiPath: string) {
    if (!this.keys) {
      throw new Error('Keys not created')
    }
    if (!this.client) {
      throw new Error('Client not created')
    }
    this.contracts.push({ key: parse(contractPath).base.split('.')[0], value: new Contract(resolve(contractPath), resolve(abiPath), this.client, this.keys) })
  }

  public AddContractFromAddress(address: string, abiPath: string, contractName: string) {
    if (!this.keys) {
      throw new Error('Keys not created')
    }
    if (!this.client) {
      throw new Error('Client not created')
    }
    let contract = new Contract(null, resolve(abiPath), this.client, this.keys, true);
    contract.address = address;
    contract.isDeployed = true;
    this.contracts.push({ key: contractName, value: contract });
  }

}
