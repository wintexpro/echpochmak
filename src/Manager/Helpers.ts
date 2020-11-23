import { Contract } from '../Contract/Contract';

export class Helpers {
  public static async deployCheck(address, client) {
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const _contract = await client.queries.accounts.query(
        {
          id: { eq: address },
        },
        'id'
      );
      if (_contract.length > 0) break;
    }
  }
  public static async getAccountBalance(address, client) {
    const balance = await client.queries.accounts.query(
      {
        id: { eq: address },
      },
      'id'
    );
    return parseInt(balance[0].balance, 16);
  }

  public static async balanceHasChanged(
    address,
    client,
    oldValue,
    type: hasChangedValue
  ) {
    while (true) {
      const currentBalance = await Helpers.getAccountBalance(address, client);
      if (currentBalance != oldValue) {
        if (type == hasChangedValue.big) {
          if (currentBalance > oldValue) break;
          else throw new Error('The value has decreased');
        }
      } else if (type == hasChangedValue.small) {
        if (currentBalance < oldValue) break;
        else throw new Error('The value has grown');
      }
    }
  }

  public static async getRunFees(
    contract: Contract,
    functionName,
    input,
    client,
    keyPair
  ) {
    const calcFees = await client.contracts.calcRunFees({
      address: contract.address,
      functionName,
      abi: contract.contractPackage.abi,
      input,
      keyPair,
    });
    return calcFees;
  }
  public static async getDeployFees(
    contract: Contract,
    constructorParams,
    newAccount: boolean,
    client,
    keyPair
  ) {
    const deployFees = await client.contracts.calcDeployFees({
      package: contract.contractPackage,
      constructorParams,
      keyPair,
      newAccount,
    });
    return deployFees;
  }
}

export enum hasChangedValue {
  big,
  small,
}
