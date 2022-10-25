/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const { expect } = require('chai')
const { _ } = require('core-js')
const { ethers } = require('hardhat')
const { TASK_COMPILE_SOLIDITY_RUN_SOLC } = require('hardhat/builtin-tasks/task-names')

describe('Payment Splitter Ownable Testing', function () {
  let bob, alice, john, hacker
  let Splitter, SplitterInstance
  before(async () => {
    [bob, alice, john, caro, andrea, maria, hacker] = await ethers.getSigners()
    await hre.network.provider.send('hardhat_reset')
    console.group()
    console.group()
    console.group()
    console.log('Bob: ' + bob.address)
    console.log('Alice: ' + alice.address)
    console.log('John: ' + john.address)
    console.log('Caro: ' + caro.address)
    console.log('Andrea: ' + andrea.address)
    console.log('Maria: ' + maria.address)
    console.log('Hacker: ' + hacker.address)
    console.groupEnd()
    console.groupEnd()
    console.groupEnd()
    PSHandler = await ethers.getContractFactory('PSHandler')
    PSplitter = await ethers.getContractFactory('PSplitter')
    PSHandlerInstance = await PSHandler.deploy()
    await PSHandlerInstance.deployed()
  })
  describe('Before Initialization', () => {
    it('Owner equal to 0x0000000000000000000000000000000000000000', async function () {
      const owner = await PSHandlerInstance.owner()
      expect(owner).to.equal('0x0000000000000000000000000000000000000000')
    })
  })
  describe('PSHandler Initialization', () => {
    it('Should Initialize just one time', async function () {
      await PSHandlerInstance.initialize()
    })
  })
  describe('Access: Owner Initialization', () => {
    it('Owner of the System is Bob', async function () {
      const owner = await PSHandlerInstance.owner()
      expect(owner).to.equal(bob.address)
    })
  })
  describe('First State - PSHandler', () => {
    it('_splitters_counter should be zero', async function () {
      const counter = await PSHandlerInstance._splitters_counter()
      expect(counter).to.equal(0)
    })
  })
  describe('Alice creates a new Split Payment and funds it', () => {
    it('Alice initialize splitter with shares and accounts and fund the contract with 45 ETH', async function () {
      const payees = [caro.address, maria.address, andrea.address]
      const shares = [ethers.utils.parseUnits('10'), ethers.utils.parseUnits('15'), ethers.utils.parseUnits('20')]
      await PSHandlerInstance.connect(alice).createSplitter(payees, shares)
      const splitter_address = await PSHandlerInstance.connect(alice).getSplitter(1)
      const alice_splitter = await PSplitter.attach(splitter_address).owner()
      const owner = await PSHandlerInstance.owner()
      console.group()
      console.group()
      console.group()
      console.log('PSHandler Contract address: ' + PSHandlerInstance.address)
      console.log('PSplitter Contract address: ' + splitter_address)
      console.warn('PSHandler Owner: ' + owner)
      console.warn('Bob"s address: ' + bob.address)
      console.log('PSplitter Owner: ' + alice_splitter)
      console.log('Alice address: ' + alice.address)
      console.log('Alice First Split Initial Contract Balance: ' + ethers.utils.formatEther(await ethers.provider.getBalance(PSHandlerInstance.address)))
      await alice.sendTransaction({
        to: splitter_address,
        value: ethers.utils.parseEther('70')
      })
      console.log('Alice After Contract Balance: ' + ethers.utils.formatEther(await ethers.provider.getBalance(splitter_address)))
      console.groupEnd()
      console.groupEnd()
      console.groupEnd()
      expect(alice_splitter).to.equal(alice.address)
    })
  })
/*   describe('Verify Alice Split parameters', () => {
    it('Total Shares of Alice Splitter: 45', async function () {
      const splitter_address = await PSHandlerInstance.connect(alice).getSplitter(1)
      const alice_splitter = await PSplitter.attach(splitter_address)
      const total_shares = await ethers.utils.formatEther(await alice_splitter.totalShares())
      expect(total_shares).to.equal('70.0')
    })
  }) */
  describe('Verify Caro, Maria and Andreas Shares', () => {
    it('Caro has 10 shares', async function () {
      const splitter_address = await PSHandlerInstance.connect(alice).getSplitter(1)
      const alice_splitter = await PSplitter.attach(splitter_address)
      const total_shares = await ethers.utils.formatEther(await alice_splitter.shares(caro.address))
      expect(total_shares).to.equal('10.0')
    })
    it('Maria has 15', async function () {
      const splitter_address = await PSHandlerInstance.connect(alice).getSplitter(1)
      const alice_splitter = await PSplitter.attach(splitter_address)
      const total_shares = await ethers.utils.formatEther(await alice_splitter.shares(maria.address))
      expect(total_shares).to.equal('15.0')
    })
    it('Andrea has 20', async function () {
      const splitter_address = await PSHandlerInstance.connect(alice).getSplitter(1)
      const alice_splitter = await PSplitter.attach(splitter_address)
      const total_shares = await ethers.utils.formatEther(await alice_splitter.shares(andrea.address))
      expect(total_shares).to.equal('20.0')
    })
    it('Caro shares are equivalent to 10 ETH', async function () {
      // eslint-disable-next-line no-use-before-define
      const splitter_address = await PSHandlerInstance.connect(alice).getSplitter(1)
      const alice_splitter = await PSplitter.attach(splitter_address)
      const releasable = await alice_splitter.connect(alice)['releasable(address)'](caro.address)
      const total_shares1 = await alice_splitter.shares(caro.address)
      console.group()
      console.group()
      console.group()
      console.log(`Caro total_shares: ${ethers.utils.formatEther(total_shares1)}`)
      console.log('Caro Releasable: + ' + ethers.utils.formatEther(releasable))
      console.log('Caro Balance: + ' + ethers.utils.formatEther(await ethers.provider.getBalance(caro.address)))
      console.groupEnd()
      console.groupEnd()
      console.groupEnd()
    })
  })
  describe('Intends to bypass the contract security', () => {
    it('Hacker failed to release Caros Shares because He is not the Owner', async function () {
      // eslint-disable-next-line no-use-before-define
      const splitter_address = await PSHandlerInstance.connect(alice).getSplitter(1)
      const alice_splitter = await PSplitter.attach(splitter_address)
      await expect(alice_splitter.connect(hacker)['release(address)'](caro.address)).to.be.revertedWith('Ownable: caller is not the owner')
      const releasable = await alice_splitter.connect(alice)['releasable(address)'](caro.address)
      console.group()
      console.group()
      console.group()
      console.log('Caro Releasable: + ' + await ethers.utils.formatEther(releasable))
      console.groupEnd()
      console.groupEnd()
      console.groupEnd()
    })
    it('Bob, owner of the system failed to release Caros Shares because He is not the Owner of the Splitter Instance', async function () {
      // eslint-disable-next-line no-use-before-define
      const splitter_address = await PSHandlerInstance.connect(alice).getSplitter(1)
      const alice_splitter = await PSplitter.attach(splitter_address)
      await expect(alice_splitter.connect(bob)['release(address)'](caro.address)).to.be.revertedWith('Ownable: caller is not the owner')
      const releasable = await alice_splitter.connect(alice)['releasable(address)'](caro.address)
      console.group()
      console.group()
      console.group()
      console.log('Caro Releasable: + ' + await ethers.utils.formatEther(releasable))
      console.groupEnd()
      console.groupEnd()
      console.groupEnd()
    })
    it('Alice release Caros shares successfully because She is the Owner', async function () {
      // eslint-disable-next-line no-use-before-define
      const splitter_address = await PSHandlerInstance.connect(alice).getSplitter(1)
      const alice_splitter = await PSplitter.attach(splitter_address)
      await alice_splitter.connect(alice)['release(address)'](caro.address)
      const releasable = await alice_splitter.connect(alice)['releasable(address)'](caro.address)
      console.group()
      console.group()
      console.group()
      console.log('Caro Releasable: + ' + await ethers.utils.formatEther(releasable))
      console.groupEnd()
      console.groupEnd()
      console.groupEnd()
    })
  })
  /*   describe('Verificar quien es el owner', () => {
    it('Es un erc-20 con oferta de 80 millones de tokens', async function () {
          const Splitter = await ethers.getContractFactory("Splitter");
          const SplitterInstance = await Splitter.deploy();
          await SplitterInstance.deployed()
                let total_supply = await SplitterInstance.totalSupply()
          const expected_supply = "80000000.0"
          total_supply = ethers.utils.formatEther(total_supply)
          expect(total_supply.toString()).to.equal(expected_supply)
            console.log(pedro.address)
      console.log(await SplitterInstance.balanceOf(pedro.address))
      console.log(await SplitterInstance.balanceOf(alicia.address))
    })
  }) */
/*   describe('Transacciones', () => {
    it('Pedro envia 100 Splitters a Juan', async function () {
      await SplitterInstance.connect(pedro).transfer(juan.address, ethers.utils.parseUnits('500'))
      console.log(await SplitterInstance.balanceOf(pedro.address))
      console.log(await SplitterInstance.balanceOf(juan.address))
    })
  }) */
})

/* TODO:
    Add destroy functionality just for owners
    Add test to verify splitter Counters
    Add test to check current User of PSHandler
    Add test to check event PaymentSplitterCloned
    Clone tests but with ERC20 Tokens
    Clone tests but with AVAX, BSC, DOT
    Add test for upgradability
    Think of the posibility to make multichain Contract
*/
