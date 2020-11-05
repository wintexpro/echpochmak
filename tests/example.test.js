// eslint-disable-next-line @typescript-eslint/no-var-requires
const Manager = require('../build/main/Deploy/CreateManager').default;

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
  });

  it('test one', async () => {
    console.log(manager);
    await manager.contracts[0].value.DeployContract();
    console.log(manager.contracts[0].value.address);
  });
});
