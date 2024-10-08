# ZapSwap Core Smart contracts

[![Lint](https://github.com/Zapswap/core-contracts/actions/workflows/lint.yml/badge.svg)](https://github.com/Zapswap/core-contracts/actions/workflows/lint.yml)
[![Tests](https://github.com/Zapswap/core-contracts/actions/workflows/tests.yml/badge.svg)](https://github.com/Zapswap/core-contracts/actions/workflows/tests.yml)
[![Fuzz Testing](https://github.com/Zapswap/core-contracts/actions/workflows/fuzz-testing.yml/badge.svg)](https://github.com/Zapswap/core-contracts/actions/workflows/fuzz-testing.yml)
[![Mythx](https://github.com/Zapswap/core-contracts/actions/workflows/mythx.yml/badge.svg)](https://github.com/Zapswap/core-contracts/actions/workflows/mythx.yml)
[![npm version](https://img.shields.io/npm/v/@pollum-io/v3-core/latest.svg)](https://www.npmjs.com/package/@zapswap/core-contracts/v/latest)

*Forked From [Uniswap](https://github.com/uniswap)*

This repository contains the core smart contracts for the Zapswap Protocol.
For higher level contracts, see the [Periphery](https://github.com/Zapswap/periphery)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@zapswap/core-contracts`
and import the factory bytecode located at
`@zapswap/core-contracts/artifacts/contracts/ZapswapFactory.sol/ZapswapFactory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@zapswap/core-contracts/artifacts/contracts/ZapswapFactory.sol/ZapswapFactory.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all Zapswap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The Zapswap interfaces are available for import into solidity smart contracts
via the npm artifact `@zapswap/core-contracts`, e.g.:

```solidity
import '@zapswap/core-contracts/contracts/interfaces/IZapswapPool.sol';

contract MyContract {
  IZapswapPool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}

```
## Addresses

TO:DO...✏️