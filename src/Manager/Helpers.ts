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
}
