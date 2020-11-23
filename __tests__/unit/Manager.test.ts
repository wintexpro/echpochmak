import { describe, expect, test, beforeAll } from '@jest/globals';
import { Manager } from '../../src/Manager/Manager';
import { TonSDKMock } from './mocks/TonSDKMock';
import { resolve } from 'path';

let manager: Manager;
describe('Manager', () => {
  beforeAll(() => {
    manager = new Manager();
    manager.client = new TonSDKMock();
  });

  test('findLastBlock: 12', async (done) => {
    expect(await manager.findLastBlock(12, manager.client, 'test')).toEqual(12);
    done();
  });

  test('findLastBlock null', async (done) => {
    expect(await manager.findLastBlock(55, manager.client, 'test')).toEqual(
      null
    );
    done();
  });

  test('createKeysAndReturn', async (done) => {
    expect(await manager.createKeysAndReturn()).toEqual({
      secret: 'testSecret',
      public: 'testPublic',
    });
    done();
  });

  test('loadContract', async (done) => {
    await manager.loadContract(
      resolve('./WalletContract/10_Wallet.tvc'),
      resolve('./WalletContract/10_Wallet.abi.json')
    );

    expect(manager.contracts['10_Wallet'].address).toEqual(
      '0:43cef8a60c0b2dbfc5101b42691c00c05bd46b042935ad94eae7f6e062eac3c6'
    );
    done();
  });

  test('addContractFromAddress', async (done) => {
    expect(
      manager.addContractFromAddress(
        'test1',
        resolve('./WalletContract/10_Wallet.abi.json'),
        'TestWallet'
      )
    ).resolves.not.toThrow();
    done();
  });

  test('addContractFromAddress invalid address', async (done) => {
    expect(
      manager.addContractFromAddress(
        'test9',
        resolve('./WalletContract/10_Wallet.abi.json'),
        'TestWallet'
      )
    ).rejects.toThrow();
    done();
  });
});
