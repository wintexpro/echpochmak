describe('Asserts', () => {
  let manager;
  beforeEach(async () => {
    await restart(8080);
    manager = new Manager();
    await manager.CreateClient(['http://localhost:8080/graphql']);
    await manager.createKeys();
    manager.loadContract(
      './tests/contract/15_MessageReceiver.tvc', // tvc
      './tests/contract/15_MessageReceiver.abi.json' // abi
    );
    manager.loadContract(
      './tests/contract/15_MessageSender.tvc',
      './tests/contract/15_MessageSender.abi.json' // Name
    );

    await manager.contracts['15_MessageReceiver'].DeployContract();
    await manager.contracts['15_MessageSender'].DeployContract();
  });

  it('test one', async () => {
    await manager.AddContractFromAddress(
      manager.contracts['15_MessageReceiver'].address,
      './tests/contract/15_MessageReceiver.abi.json', // abi
      'Receiver'
    );
  });
});
