// eslint-disable-next-line @typescript-eslint/no-var-requires
const Manager = require('../build/main/Deploy/CreateManager').default;

describe('Asserts', () => {
  let mananger;
  beforeEach(async () => {
    mananger = new Manager();
    await mananger.CreateClient(['http://localhost:8080/graphql']);
    await mananger.createKeys();
    mananger.loadContract(
      './tests/contract/InitParams.tvc',
      './tests/contract/InitParams.abi.json'
    );
  });

  it('test one', async () => {
    console.log(mananger);
    let addr = await mananger.contracts[0].value.DeployContract();
    console.log(addr);
  });
});
