describe('Asserts', () => {
  let manager;
  beforeEach(async () => {
    manager = new Manager();
    await manager.CreateClient(['http://localhost:8080/graphql']);
    await manager.createKeys();
    manager.loadContract(
      './tests/contract/InitParams.tvc',
      './tests/contract/InitParams.abi.json'
    );
    manager.loadContract(
      './tests/contract/9_PiggyBank.tvc',
      './tests/contract/9_PiggyBank.abi.json'
    );
    manager.loadContract(
      './tests/contract/9_PiggyBank_Owner.tvc',
      './tests/contract/9_PiggyBank_Owner.abi.json'
    );
    manager.loadContract(
      './tests/contract/9_PiggyBank_Stranger.tvc',
      './tests/contract/9_PiggyBank_Stranger.abi.json'
    );
    manager.loadContract(
      './tests/contract/15_MessageReceiver.tvc',
      './tests/contract/15_MessageReceiver.abi.json'
    );
    manager.loadContract(
      './tests/contract/15_MessageSender.tvc',
      './tests/contract/15_MessageSender.abi.json'
    );
    await manager.contracts['15_MessageReceiver'].DeployContract();
    await manager.contracts['15_MessageSender'].DeployContract();
    await manager.contracts['InitParams'].DeployContract();
    await manager.contracts['9_PiggyBank_Owner'].DeployContract();
    await manager.contracts['9_PiggyBank_Stranger'].DeployContract();
    await manager.contracts['9_PiggyBank'].DeployContract({
      own: manager.contracts['9_PiggyBank_Owner'].address,
      lim: 1000000,
    });
  });

  it('test one', async () => {
    let Wallet = await manager.createWallet();
    manager.GiveToAddress(Wallet.address);
  });
});
