describe('Asserts', () => {
  let manager;
  beforeEach(async () => {
    await restart(8080);
    manager = new Manager();
    await manager.CreateClient(['http://localhost:8080/graphql']);
    await manager.createKeys();
  });

  it('test one', async () => {
    let wallet = await manager.createWallet();
    await wallet.Deploy();
    console.log(wallet.address);
    manager.GiveToAddress(wallet.address);
  });
});
