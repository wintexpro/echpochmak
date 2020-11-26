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

  public static async hasOnBounced(address, timestamp: number, client) {
    while (true) {
      const messages = await client.queries.messages.query(
        {
          dst: { eq: address },
          created_at: { gt: timestamp },
          bounced: { eq: true },
        },
        'dst created_at, bounced'
      );
      if (messages.length > 1) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  public static async lastTransaction(
    address,
    client,
    fields = 'account_addr, aborted'
  ) {
    const transaction = await client.queries.transactions.query(
      {
        account_addr: { eq: address },
      },
      fields
    );
    return transaction.length != 0 ? transaction[0] : null;
  }

  public static async lastMessage(
    address,
    client,
    fields = 'src, dst, bounce, bounced, value'
  ) {
    const messages = await client.queries.messages.query(
      {
        src: { eq: address },
      },
      fields
    );
    return messages.length != 0 ? messages[0] : null;
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
