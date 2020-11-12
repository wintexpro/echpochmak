import { TONClient } from 'ton-client-node-js';
import { Contract } from '../Contract/Contract';
import { resolve, parse } from 'path';
import { GiveGrams } from '../Deploy/Deploy';
import { Wallet } from '../Contract/Wallet';
export default class Manager {
  public client: any;
  public contracts = {};
  public keys: any;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  public async CreateClient(servers: string[] = ['net.ton.dev']) {
    this.client = await new Promise(async function (resolve) {
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        try {
          const client = await TONClient.create({
            servers,
            log_verbose: globalThis.verbose,
          });
          const ver = await client.queries.serverInfo.version;
          console.log('cl ' + ver);
          resolve(client);
          break;
        } catch (error) {
          console.log(error);
        }
      }
    });
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const block = await this.findLastBlock(0, this.client, 'id');
      if (block) {
        break;
      }
    }
  }

  public async createKeys() {
    this.keys = await this.client.crypto.ed25519Keypair();
  }

  public async findLastBlock(
    chain: number,
    client,
    result: string,
    additionalFilter?: any
  ): Promise<any> {
    const blocks = await client.queries.blocks.query({
      filter: { workchain_id: { eq: chain }, ...(additionalFilter || {}) },
      result,
      orderBy: [
        {
          path: 'seq_no',
          direction: 'DESC',
        },
      ],
      limit: 1,
    });
    return blocks.length > 0 ? blocks[0] : null;
  }

  public async createKeysAndReturn() {
    return await this.client.crypto.ed25519Keypair();
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

  public loadContract(
    contractPath: string,
    abiPath: string,
    contractName?: string
  ) {
    if (!this.keys) {
      throw new Error('Keys not created');
    }
    if (!this.client) {
      throw new Error('Client not created');
    }
    this.contracts[
      contractName || parse(contractPath).base.split('.')[0]
    ] = new Contract(
      resolve(contractPath),
      resolve(abiPath),
      this.client,
      this.keys
    );
  }

  public createWallet(keys?) {
    const wallet = new Wallet();
    wallet.CreateWallet(this.client, keys || this.keys);
    return wallet;
  }

  public AddContractFromAddress(
    address: string,
    abiPath: string,
    contractName: string,
    keyPair?
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
      keyPair || this.keys,
      true
    );
    contract.address = address;
    contract.isDeployed = true;
    this.contracts[contractName] = contract;
  }
}
