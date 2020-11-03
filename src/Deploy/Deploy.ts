import { Contract } from "../Contract/Contract";

export const Deploy = async (client, contract: Contract, keys) => {
  const address = (await client.contracts.deploy({
    package: contract.contractPackage,
    constructorParams: {},
    keyPair: keys,
  })).address;
  return address;
}
