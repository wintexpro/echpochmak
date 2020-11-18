describe('Asserts', () => {
  let manager;
  beforeEach(async () => {
    await restart(8080);
    manager = new Manager();
    await manager.createClient(['http://localhost:8080/graphql']);
    await manager.createKeys();
    manager.loadContract(
      './tests/contract/15_MessageReceiver.tvc', // tvc
      './tests/contract/15_MessageReceiver.abi.json' // abi
    );
    manager.loadContract(
      './tests/contract/15_MessageSender.tvc',
      './tests/contract/15_MessageSender.abi.json' // Name
    );

    await manager.contracts['15_MessageReceiver'].deployContract();
    await manager.contracts['15_MessageSender'].deployContract();
  });

  it('test one', async () => {
    await manager.contracts['15_MessageSender'].runContract('sendMessage', {
      anotherContract: manager.contracts['15_MessageReceiver'].address,
    });
    let res = await manager.contracts['15_MessageReceiver'].runContract(
      'getCounter',
      {}
    );
    assert.equal(res.c, '0x1', 'TEST MESSAGE');
  });
});
