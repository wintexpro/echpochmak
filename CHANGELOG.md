# Release Notes

All notable changes to this project will be documented in this file.

## 0.2.10 Dec 2, 2020

### Fix

- Now keyPair accepts undefined

## 0.2.9 Dec 1, 2020

### Fix

- Add wallet.abi.json file in build

## 0.2.4 Nov 30, 2020

### Fix

- Rename wallet.Deploy -> wallet.deploy

## 0.2.3 Nov 30, 2020

### Fix

- Fix npm install

## 0.2.2 Nov 27, 2020

### Fix

- Fix example tests

### Update

- Update license MIT -> Apache

## 0.1.3-rc2 Nov 26, 2020

### New

- Manager helpers
  - hasOnBounced
  - lastTransaction
  - lastMessage

## 0.1.3-rc1 Nov 25, 2020

### New

- Add custom reporter
  - Added the output of the description of the error

### Fix

- Fix --path required
- Fix test example

## 0.1.1 Nov 23, 2020

### New

- Asserts
  - assertError
- Manager helpers
  - getDeployFees
  - getRunFees
- runWithMessage function

## 0.1.0 Nov 20, 2020

### New

- Manager helpers
  - getAccountBalance
  - balanceHasChanged
- err_log_verbose in create client function

## 0.0.1 Nov 19, 2020

### New

- Now the loadContract function is `async` and calculates the future address of the contract with an entry in the `.address` field
- Manager no longer generates and stores keys inside itself
- loadContract signature
- Manager helpers
  - deployCheck
- Add runLocal function

### Remove

- createKeys() function
- setKeys() function
