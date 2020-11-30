/* eslint-disable @typescript-eslint/no-var-requires */
const BaseContract = require('../build/main/index').BaseContract;

class MyContract extends BaseContract {
  async getData() {
    return await this.runLocal('getData', {});
  }
}

module.exports = MyContract;
