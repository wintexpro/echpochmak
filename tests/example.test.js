describe('Asserts', () => {
  let manager;
  beforeEach(async () => {
    //await restart(8080);
    manager = new Manager();
    await manager.CreateClient();
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
      '0:653b9a6452c7a982c6dc92b2da9eba832ade1c467699ebb3b43dca6d77b780dd',
      './tests/contract/giberAbi.json', // abi
      'giver'
    );
    await manager.contracts['giver'].RunContract('requestGrams', {
      remoteContractAddress:
        '0:762a4c23e6a1418d2e411690afbd824538ac6b3cbdb7ab23755590e06e51c34f',
      value: 100,
    });
  });
});
