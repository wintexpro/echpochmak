import { describe, expect, test, beforeAll } from '@jest/globals';
import { Manager } from '../../src/Manager/Manager';
import { TonSDKMock } from './mocks/TonSDKMock';
import { resolve } from 'path';

let manager: Manager;
describe('Contracts', () => {
  beforeAll(async () => {
    manager = new Manager();
    manager.client = new TonSDKMock();
    await manager.loadContract(
      resolve('./WalletContract/10_Wallet.tvc'),
      resolve('./WalletContract/10_Wallet.abi.json')
    );
  });

  test('deployContract', async (done) => {
    expect(
      manager.contracts['10_Wallet'].deployContract({}, false)
    ).resolves.not.toThrow();
    done();
  });

  test('runWithMessage', async (done) => {
    expect(
      await manager.contracts['10_Wallet'].runWithMessage('test', {
        test: 'test',
      })
    ).toEqual('test');
    done();
  });

  test('runLocal', async (done) => {
    expect(
      await manager.contracts['10_Wallet'].runLocal('test', 'test')
    ).toEqual({ input: 'test' });
    done();
  });

  test('futureAddress', async (done) => {
    expect(await manager.contracts['10_Wallet'].futureAddress()).toEqual(
      '0:43cef8a60c0b2dbfc5101b42691c00c05bd46b042935ad94eae7f6e062eac3c6'
    );
    done();
  });

  test('runContract', async (done) => {
    expect(
      await manager.contracts['10_Wallet'].runContract('testNane', 'input')
    ).toEqual('input');
    done();
  });
});
