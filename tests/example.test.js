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
    manager.contracts['15_MessageSender'].deployContract();
  });

  it('test one', async () => {
    const balance = await manager.client.queries.accounts.query(
      {
        id: { eq: manager.contracts['15_MessageSender'].address },
      },
      'id balance'
    );
    console.log(balance);
  });
});
