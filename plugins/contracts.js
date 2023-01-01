import { ethers } from 'ethers'
import PSHandler from '@/solidity/artifacts/contracts/PSHandler.sol/PSHandler.json'

export default ({ app }, inject) => {
  const PSHandlerInstance = async function () {
    console.log(app)
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any'
    )
    const signer = await provider.getSigner()
    const instance = new ethers.Contract(app.context.env.CONTRACT_ADDRESS, PSHandler.abi, signer)
    return instance
  }

  inject('PSHandler', PSHandlerInstance)

  const signer = async function () {
    const provider = new ethers.providers.Web3Provider(
      window.ethereum,
      'any'
    )
    const signer = await provider.getSigner()
    return signer
  }
  inject('MeSigner', signer)

  const etherToWei = function (etherUnits) {
    const weiUnits = ethers.utils.parseEther(etherUnits)
    return weiUnits
  }

  inject('etherToWei', etherToWei)

  const weiToEther = function (etherUnits) {
    const weiUnits = ethers.utils.formatEther(etherUnits)
    return weiUnits
  }

  inject('weiToEther', weiToEther)
}
