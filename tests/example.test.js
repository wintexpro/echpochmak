describe('Asserts', () => {
  let manager;
  beforeEach(async () => {
    await restart(8080);
    manager = new Manager();
    await manager.createClient(['http://localhost:8080/graphql']);
    await manager.loadContract(
      './tests/contract/15_MessageReceiver.tvc', // tvc
      './tests/contract/15_MessageReceiver.abi.json' // abi
    );
    await manager.loadContract(
      './tests/contract/15_MessageSender.tvc',
      './tests/contract/15_MessageSender.abi.json' // Name
    );
  });

  it('test one', async () => {
    console.log(manager.contracts['15_MessageReceiver'].address);
  });
});
