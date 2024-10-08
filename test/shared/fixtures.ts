import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeZapswapPool } from '../../typechain/MockTimeZapswapPool'
import { TestERC20 } from '../../typechain/TestERC20'
import { ZapswapFactory } from '../../typechain/ZapswapFactory'
import { TestZapswapCallee } from '../../typechain/TestZapswapCallee'
import { TestZapswapRouter } from '../../typechain/TestZapswapRouter'
import { MockTimeZapswapPoolDeployer } from '../../typechain/MockTimeZapswapPoolDeployer'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: ZapswapFactory
}

async function factoryFixture(): Promise<FactoryFixture> {
  const factoryFactory = await ethers.getContractFactory('ZapswapFactory')
  const factory = (await factoryFactory.deploy()) as ZapswapFactory
  return { factory }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestZapswapCallee
  swapTargetRouter: TestZapswapRouter
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeZapswapPool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeZapswapPoolDeployerFactory = await ethers.getContractFactory('MockTimeZapswapPoolDeployer')
  const MockTimeZapswapPoolFactory = await ethers.getContractFactory('MockTimeZapswapPool')

  const calleeContractFactory = await ethers.getContractFactory('TestZapswapCallee')
  const routerContractFactory = await ethers.getContractFactory('TestZapswapRouter')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestZapswapCallee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestZapswapRouter

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer = (await MockTimeZapswapPoolDeployerFactory.deploy()) as MockTimeZapswapPoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string
      return MockTimeZapswapPoolFactory.attach(poolAddress) as MockTimeZapswapPool
    },
  }
}
