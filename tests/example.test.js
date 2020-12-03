// eslint-disable-next-line @typescript-eslint/no-var-requires
const BankContract = require('./CustomObject.example');
describe('Asserts', () => {
  let manager;
  beforeEach(async () => {
    // restart use 8080 port
    await restart(8080);
    // Create new manager
    manager = new Manager();
    // Create client
    await manager.createClient(['http://127.0.0.1:8080/graphql']);
    // Load contracts
    await manager.loadContract(
      './tests/contract/9_PiggyBank_Owner.tvc',
      './tests/contract/9_PiggyBank_Owner.abi.json'
    );
    await manager.loadContract(
      './tests/contract/9_PiggyBank_Stranger.tvc',
      './tests/contract/9_PiggyBank_Stranger.abi.json'
    );
    // Create custom BankContract object
    // (See ../CustomObject.example.js)
    const customBankObject = await new BankContract(
      './tests/contract/9_PiggyBank.tvc',
      './tests/contract/9_PiggyBank.abi.json',
      manager.client,
      await manager.createKeysAndReturn()
    );

    manager.addCustomContract(customBankObject, 'customBank');

    // Deploy
    await manager.contracts['9_PiggyBank_Owner'].deployContract();
    await manager.contracts['9_PiggyBank_Stranger'].deployContract();
    await manager.contracts['customBank'].deployContract({
      own: manager.contracts['9_PiggyBank_Owner'].address,
      lim: 1000000,
    });
  });

  it('test one', async () => {
    await manager.contracts['9_PiggyBank_Owner'].runContract('addToDeposit', {
      bankAddress: manager.contracts['customBank'].address,
      amount: 100000,
    });
    manager.giveToAddress(manager.contracts['customBank'].address);
    await assertError(
      async () => {
        await manager.contracts['customBank'].runContract('getData', {});
      },
      3025,
      'getData'
    );
    const res = await manager.contracts['customBank'].getData();
    console.log(res);
  });
});
