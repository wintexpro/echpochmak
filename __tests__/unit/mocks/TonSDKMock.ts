/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export class TonSDKMock {
  public crypto = new SdkCryptoMock();
  public queries = new SdkQueriesMock();
  public contracts = new SdkContractsMock();
}

export abstract class AbstractSdkQueriesMock {
  public query(...args) {
    return;
  }
}

export class SdkQueriesMock {
  public accounts = new SdkAccountsMock(['test1', 'test2']);
  public blocks = new SdkBlocksMock([12, 45]);
}

export class SdkAccountsMock extends AbstractSdkQueriesMock {
  private accounts: string[];
  constructor(accounts: string[]) {
    super();
    this.accounts = accounts;
  }
  public query(filter: any, field: string): [] {
    return this.accounts.filter((x) => x == filter[field].eq) as [];
  }
}

export class SdkBlocksMock extends AbstractSdkQueriesMock {
  public blocks: number[];
  constructor(blocks: number[]) {
    super();
    this.blocks = blocks;
  }
  public query(filter: any) {
    return this.blocks.filter((x) => x == filter.filter.workchain_id.eq) as [];
  }
}

export class SdkCryptoMock extends AbstractSdkQueriesMock {
  public ed25519Keypair() {
    return { secret: 'testSecret', public: 'testPublic' };
  }
}

export class SdkContractsMock {
  public async getDeployData(abi: any, imageBase: any, publicKeyHex: any) {
    return {
      address:
        '0:43cef8a60c0b2dbfc5101b42691c00c05bd46b042935ad94eae7f6e062eac3c6',
    };
  }

  public async createRunMessage(params: any) {
    return { message: 'test' };
  }

  public async sendMessage(message) {
    return { state: 'test' };
  }

  public async waitForRunTransaction(message, state) {
    if (state.state != 'test') throw new Error('Invalid state');
    if (message.message != 'test') throw new Error('Invalid message');
    return 'test';
  }

  public async runLocal(params: any) {
    return { input: params.input };
  }
  public async waitForDeployTransaction(message, state) {
    if (state.state != 'test') throw new Error('Invalid state');
    if (message.message != 'test') throw new Error('Invalid message');
    return;
  }
  public createDeployMessage(_package, constructorParams, keyPair) {
    return {
      message: 'test',
      address:
        '0:43cef8a60c0b2dbfc5101b42691c00c05bd46b042935ad94eae7f6e062eac3c6',
    };
  }

  public async run(params: any) {
    return { output: params.input };
  }
}
