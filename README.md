[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/wintexpro/echpochmak">
    <img src="https://i.imgur.com/PLFUcbp.jpg" alt="Logo" width="300" height="300">
  </a>

  <h3 align="center">Echpochmak</h3>

  <p align="center">
    ⚠️ (Work In Progress)
    <br />
    <a href="https://github.com/wintexpro/echpochmak/issues">Report Bug</a> |
    <a href="https://github.com/wintexpro/echpochmak/issues">Request Feature</a>
    <br />
  </p>

</p>
<!-- ABOUT THE PROJECT -->

## About The Project

Echpochmak is a set of TON-based contracts testing tools. It provides a high-level way to set up your development environment, interact with TON through an external API, and write your integration and e2e test cases. Echpochmak targets to test external components using calls, which allows test TON to be used as a black box.

## Content Table

- [About The Project](#about-the-project)
- [Content Table](#content-table)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Write test](#write-test)
  - [Restart tondev command](#restart-tondev-command)
  - [Or set port (if you use don't default port in tondev-cli)](#or-set-port-if-you-use-dont-default-port-in-tondev-cli)
  - [The manager is in the global scope](#the-manager-is-in-the-global-scope)
  - [Create new Manager object](#create-new-manager-object)
  - [Create client](#create-client)
  - [Generate keys](#generate-keys)
  - [Load contract](#load-contract)
  - [Referring to the contract](#referring-to-the-contract)
  - [Deploy contract](#deploy-contract)
  - [Deploy with parameters](#deploy-with-parameters)
  - [Or use custom keys](#or-use-custom-keys)
  - [Add contract from address](#add-contract-from-address)
  - [Run contract](#run-contract)
  - [Run contract(no sign)](#run-contractno-sign)
  - [RunLocal contract](#runlocal-contract)
  - [Run contract with message](#run-contract-with-message)
  - [Use Giver](#use-giver)
  - [Contract fields](#contract-fields)
- [Helpers](#helpers)
  - [Use `helpers` from Manager object](#use-helpers-from-manager-object)
  - [deployCheck](#deploycheck)
  - [getAccountBalance](#getaccountbalance)
  - [balanceHasChanged](#balancehaschanged)
  - [getRunFees](#getrunfees)
  - [getDeployFees](#getdeployfees)
- [Asserts](#asserts)
  - [assertError](#asserterror)
- [Wallet Contract](#wallet-contract)
  - [Create Wallet object()](#create-wallet-object)
  - [or set keys](#or-set-keys)
  - [Deploy wallet](#deploy-wallet)
  - [SendTransaction](#sendtransaction)
  - [Wallet fields](#wallet-fields)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

<!-- GETTING STARTED -->

## Getting Started

1. Install `Echpochmak`

```sh
npm install -g echpochmak
```

<!-- USAGE EXAMPLES -->

## Usage

To run all tests, run:

```sh
echpochmak-cli test -p ./tests/example.test.js
```

Synopsis

> test [options]

Options

| Option              | Description           | Default |
| ------------------- | --------------------- | ------- |
| -p, --path          | Path to test folder   |         |
| -b, --bail          | Enable bail           | false   |
| -v, --verbose       | Wite debug info       | false   |
| -t, --timeout       | Timeout time for test | 0       |
| --version (boolean) | Show version          |         |
| --help (boolean)    | Show help information |         |

If you need help, use

```sh
echpochmak-cli --help
```

---

## Write test

### Tests are written using Mocha

### Restart tondev command

```js
beforeEach(async () => {
  await restart(); //Recreate and start containers
});
```

### Or set port (if you use don't default port in tondev-cli)

`restart command does not set a port for the container, but only uses it for long polling`

```js
beforeEach(async () => {
  await restart(8080); //Default 80
});
```

### The manager is in the global scope

```js
const manager = new Manager();
```

### Create new Manager object

```js
beforeEach(async () => {
    manager = new Manager();
```

### Create client

default
`['net.ton.dev']`

Signature

`async createClient(servers: string[] = ['net.ton.dev'])`

```js
await manager.createClient(['http://localhost:8080/graphql']);
```

### Generate keys

```js
let keys = await manager.createKeysAndReturn();
```

### Load contract

Signature

`public async loadContract( contractPath: string, abiPath: string, options: loadOptions ) `

```js
await manager.loadContract(
  './tests/contract/15_MessageReceiver.tvc', // tvc
  './tests/contract/15_MessageReceiver.abi.json' // abi
);
await manager.loadContract(
  './tests/contract/15_MessageReceiver.tvc', // tvc
  './tests/contract/15_MessageReceiver.abi.json' // abi
);
// Custom name
await manager.loadContract(
  './tests/contract/15_MessageSender.tvc',
  './tests/contract/15_MessageSender.abi.json',
  { contractName: 'sender ' } // Name
);
// Custom keys
await manager.loadContract(
  './tests/contract/15_MessageSender.tvc',
  './tests/contract/15_MessageSender.abi.json',
  { keys: anyKeys } // keys
);
```

Get future/current address

```js
let address = manager.contracts['15_MessageReceiver'].address;
```

loadOption signature

```js
export interface loadOptions {
  keys?: any;
  contractName?: string;
}
```

---

### Referring to the contract

```js
manager.contracts['Contract_name']; // Taken from the name of the tvc file without extension
```

### Deploy contract

Signature

`async deployContract(constructorParams = {}, giveGram = true, keys?)`

```js
await manager.contracts['15_MessageReceiver'].deployContract();
await manager.contracts['15_MessageSender'].deployContract();
```

### Deploy with parameters

```js
await manager.contracts['9_PiggyBank'].deployContract({
  own: manager.contracts['9_PiggyBank_Owner'].address,
  lim: 1000000,
});
```

### Or use custom keys

```js
await manager.contracts['9_PiggyBank'].deployContract({}, keys);
```

### Add contract from address

Signature

`async addContractFromAddress( address: string, abiPath: string, contractName: string, keyPair? )`

```js
await manager.addContractFromAddress(
  'address',
  'abiPath',
  'contractName',
  keyPair // HERE, the keys are indicated, if nothing is specified, those inside the contract object are used
);
```

### Run contract

Signature

`async runContract(functionName, input, keyPair?) `

```js
await manager.contracts['15_MessageSender'].runContract('sendMessage', {
  anotherContract: manager.contracts['15_MessageReceiver'].address,
});
```

### Run contract(no sign)

```js
await manager.contracts['15_MessageSender'].runContract(
  'sendMessage',
  {
    anotherContract: manager.contracts['15_MessageReceiver'].address,
  },
  null // HERE, the keys are indicated, if nothing is specified, those inside the contract object are used (see below);
);
```

### RunLocal contract

Signature
`async runLocal(functionName, input, keyPair?)`

```js
await manager.contracts['15_MessageSender'].runLocal('getData', {});
```

### Run contract with message

Signature

`public async runWithMessage(functionName, input, keyPair?)`

```js
const msg = await manager.contracts['15_MessageSender'].runWithMessage(
  'sendMessage',
  {
    anotherContract: manager.contracts['15_MessageReceiver'].address,
  }
);

console.log(`Tokens were sent. Transaction id is ${msg.transaction.id}`);
console.log(`Run fees are  ${JSON.stringify(msg.fees, null, 2)}`);
```

### Use Giver

Signature

`async giveToAddress(address, amount?: number) `

```js
manager.giveToAddress(manager.contracts['15_MessageReceiver'].address); // give 1000000000000000 gram
```

### Contract fields

```js
manager.contracts['15_MessageSender'].address; // Contract address
manager.contracts['15_MessageSender'].contractPath; // Contract path
manager.contracts['15_MessageSender'].isDeployed; // boolean
manager.contracts['15_MessageSender'].contractPackage; //{ abi,imageBase64 }
```

---

## Helpers

### Use `helpers` from Manager object

```js
manager.helpers.<helper>;
```

### deployCheck

Signature
`public static async deployCheck(address, client)`

```js
await manager.helpers.deployCheck(contractAddress, manager.client);
```

### getAccountBalance

Signature
`public static async getAccountBalance(address, client)`

```js
await manager.helpers.getAccountBalance(contractAddress, manager.client);
```

### balanceHasChanged

Signature
` public static async balanceHasChanged( address, client, oldValue, type: hasChangedValue )`

```js
await manager.helpers.balanceHasChanged(
  contractAddress,
  manager.client,
  100000,
  hasChangedValue.big
);
```

hasChangedValue enum

```js
export enum hasChangedValue {
  big,
  small,
}
```

### getRunFees

Signature

` static async getRunFees( contract: Contract, functionName, input, client, keyPair )`

```js
const fees = await manager.helpers.getRunFees(
  manager.contracts['15_MessageSender'],
  'send',
  manager.client,
  keys
);
```

### getDeployFees

Signature

` static async getDeployFees( contract: Contract, constructorParams, newAccount: boolean, client, keyPair )`

```js
const fees = await manager.helpers.getDeployFees(
  manager.contracts['15_MessageSender'],
  {},
  true,
  manager.client,
  keys
);
```

---

## Asserts

### assertError

Signature

`assertError = async (asyncFn: any, code: number, message?)`

Example

```js
await assertError(
  async () => {
    await manager.contracts['9_PiggyBank'].runContract('getData', {});
  },
  3025,
  'getData'
);
```

---

## [Wallet Contract](https://github.com/tonlabs/samples/blob/master/solidity/10_Wallet.sol)

A simple wallet contract, you may find it useful when testing fallback functions

### Create Wallet object()

Signature

`async createWallet(keys?)`

```js
let wallet = await manager.createWallet();
```

### or set keys

```js
let wallet = await manager.createWallet(keys);
```

### Deploy wallet

```js
await wallet.deploy();
```

### SendTransaction

Signature

`async sendTransaction(dest: string, value: number, bounce: boolean)`

```js
await wallet.sendTransaction(
  (dest: string),
  (value: number),
  (bounce: boolean)
);
```

### Wallet fields

```js
wallet.address; // wallet address
wallet.contractPath; // wallet path
wallet.isDeployed; // boolean
wallet.contractPackage; //{ abi,imageBase64 }
```

<!-- Wallet -->

<!-- CONTRIBUTING -->

---

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

<a href="http://wintex.pro/" target="_blank">
  <img src="https://github.com/halva-suite/assets/blob/master/wintex.png?raw=true" width="200" />
</a>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[wintex-url]: http://wintex.pro/
[wintex-logo]: https://github.com/wintexpro/assets/blob/master/wintex.png?raw=true
[contributors-shield]: https://img.shields.io/github/contributors/wintexpro/echpochmak.svg?style=flat-square
[contributors-url]: https://github.com/hwintexpro/echpochmak/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/wintexpro/echpochmak.svg?style=flat-square
[forks-url]: https://github.com/halva-suite/halva/network/members
[stars-shield]: https://img.shields.io/github/stars/wintexpro/echpochmak.svg?style=flat-square
[stars-url]: https://github.com/halva-suite/halva/stargazers
[issues-shield]: https://img.shields.io/github/issues/wintexpro/echpochmak.svg?style=flat-square
[issues-url]: https://github.com/halva-suite/halva/issues
[license-shield]: https://img.shields.io/github/license/wintexpro/echpochmak.svg?style=flat-square
[license-url]: https://github.com/wintexpro/echpochmak/blob/master/LICENSE.txt
[product-screenshot]: images/screenshot.png
