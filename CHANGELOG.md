# Release Notes

All notable changes to this project will be documented in this file.

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
