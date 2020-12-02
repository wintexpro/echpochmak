/* eslint-disable @typescript-eslint/no-var-requires */
const BaseContract = require('echpochmak').BaseContract;

class BankContract extends BaseContract {
  async getData() {
    return await this.runLocal('getData', {});
  }
}

module.exports = BankContract;
