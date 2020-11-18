<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://gitlab.wintex.pro/ton/environment">
    <img src="https://i.imgur.com/PLFUcbp.jpg" alt="Logo" width="300" height="300">
  </a>

  <h3 align="center">Echpochmak</h3>

  <p align="center">
    ⚠️ (Work In Progress)
    <br />
    <a href="https://gitlab.wintex.pro/ton/environment/-/issues">Report Bug</a> |
    <a href="https://gitlab.wintex.pro/ton/environment/-/issues">Request Feature</a>
    <br />
  </p>

</p>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- GETTING STARTED -->

## Getting Started

1. Install `Echpochmak`

```sh
npm install -g ./path
```

<!-- USAGE EXAMPLES -->

## Usage

To run all tests, run:

```sh
ton-env test -p ./tests/example.test.js
```

#### Synopsis

> test [options]

#### Options

| Option              | Description                 | Default |
| ------------------- | --------------------------- | ------- |
| -p, --path          | Path to test folder         |         |
| -b, --bail          | Enable bail                 | false   |
| -v, --verbose       | Wite debug info(No working) | false   |
| -t, --timeout       | Timeout time for test       | 0       |
| --version (boolean) | Show version                |         |
| --help (boolean)    | Show help information       |         |

If you need help, use

```sh
ton-env --help
```

---

## Write test

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

### Create client(default `['net.ton.dev']`)

Signature

`async createClient(servers: string[] = ['net.ton.dev'])`

```js
await manager.createClient(['http://localhost:8080/graphql']);
```

### Create Keys for client

```js
await manager.createKeys();
```

### or SET Keys

Signature

`setKeys(secret: string, _public: string)`

```js
await manager.setKeys('public', 'secret');
```

### Generate keys

```js
let keys = await manager.createKeysAndReturn();
```

### Load contract

Signature

`public loadContract( contractPath: string, abiPath: string, contractName?: string ) `

```js
manager.loadContract(
  './tests/contract/15_MessageReceiver.tvc', // tvc
  './tests/contract/15_MessageReceiver.abi.json' // abi
);
// Custom name
manager.loadContract(
  './tests/contract/15_MessageSender.tvc',
  './tests/contract/15_MessageSender.abi.json',
  'Sender' // Name
);
```

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
  null // HERE, the keys are indicated, if nothing is specified, those inside the contract object are used (see below));
);
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

## [Wallet Contract](https://github.com/tonlabs/samples/blob/master/solidity/10_Wallet.sol)

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
await Wallet.sendTransaction(
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
