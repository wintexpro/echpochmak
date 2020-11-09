[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://gitlab.wintex.pro/ton/environment">
    <img src="https://avatars2.githubusercontent.com/u/67451441?s=400&u=16f743b727e0d20fb8883c9794a87c9d5732fe67&v=4" alt="Logo" width="100" height="100">
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

1. Install `this`

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

| Option              | Description                 |
| ------------------- | --------------------------- |
| -p, --path          | Path to test folder         |
| -b, --bail          | Enable bail                 |
| -v, --verbose       | Wite debug info(No working) |
| -t, --timeout       | Timeout time for test       |
| --version (boolean) | Show version                |
| --help (boolean)    | Show help information       |

If you need help, use

```sh
ton-env --help
```

---

## Write test

Import Manager class from module

```js
const Manager = require('../build/main/Deploy/CreateManager').default;
```

Create new Manager object

```js
beforeEach(async () => {
    manager = new Manager();
```

Create client(default `['net.ton.dev']`)

```js
await manager.CreateClient(['http://localhost:8080/graphql']);
```

Create Keys

```js
await manager.createKeys();
```

or SET Keys

```js
await manager.setKeys('public', 'secret');
```

Load contract

```js
manager.loadContract(
    manager.loadContract(
      './tests/contract/15_MessageReceiver.tvc', // tvc
      './tests/contract/15_MessageReceiver.abi.json'  // abi
    );
    manager.loadContract(
      './tests/contract/15_MessageSender.tvc',
      './tests/contract/15_MessageSender.abi.json'
    );
```

Referring to the contract

```js
manager.contracts['Contract_name']; // Taken from the name of the tvc file without extension
```

Deploy contract

```js
await manager.contracts['15_MessageReceiver'].DeployContract();
await manager.contracts['15_MessageSender'].DeployContract();
```

Deploy with parameters

```js
await manager.contracts['9_PiggyBank'].DeployContract({
  own: manager.contracts['9_PiggyBank_Owner'].address,
  lim: 1000000,
});
```

Run contract

```js
await manager.contracts['15_MessageSender'].RunContract('sendMessage', {
  anotherContract: manager.contracts['15_MessageReceiver'].address,
});
```

Run contract(no sign)

```js
await manager.contracts['15_MessageSender'].RunContract('sendMessage', {
  anotherContract: manager.contracts['15_MessageReceiver'].address,
  null, // HERE, the keys are indicated, if nothing is specified, those inside the contra object are used (see below)
});
```

Use Giver

```js
manager.GiveToAddress(manager.contracts['15_MessageReceiver'].address); // give 1000000000000000 gram
```

Contract fields

```js
manager.contracts['15_MessageSender'].address; // Contract address
manager.contracts['15_MessageSender'].contractPath; // Contract path
manager.contracts['15_MessageSender'].isDeployed; // boolean
manager.contracts['15_MessageSender'].contractPackage; //{ abi,imageBase64 }
```

---

<!-- ROADMAP -->

<!-- CONTRIBUTING -->

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

Project Link: [https://github.com/halva-suite/halva](https://github.com/halva-suite/halva)

<a href="http://wintex.pro/" target="_blank">
  <img src="https://github.com/halva-suite/assets/blob/master/wintex.png?raw=true" width="200" />
</a>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[wintex-url]: http://wintex.pro/
[wintex-logo]: https://github.com/halva-suite/assets/blob/master/wintex.png?raw=true
[contributors-shield]: https://img.shields.io/github/contributors/halva-suite/halva.svg?style=flat-square
[contributors-url]: https://github.com/halva-suite/halva/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/halva-suite/halva.svg?style=flat-square
[forks-url]: https://github.com/halva-suite/halva/network/members
[stars-shield]: https://img.shields.io/github/stars/halva-suite/halva.svg?style=flat-square
[stars-url]: https://github.com/halva-suite/halva/stargazers
[issues-shield]: https://img.shields.io/github/issues/halva-suite/halva.svg?style=flat-square
[issues-url]: https://github.com/halva-suite/halva/issues
[license-shield]: https://img.shields.io/github/license/halva-suite/halva.svg?style=flat-square
[license-url]: https://github.com/halva-suite/halva/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
