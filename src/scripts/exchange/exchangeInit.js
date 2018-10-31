import kyberAbi from '../../constants/data/json/kyberRopstenAbi';
import provider from '../../constants/Providers';

const ethers = require('ethers');
const axios = require('axios');
const kyberAddress = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';


export const fetchKyberTradingPairs = async () => {
    let request = await fetch('https://tracker.kyber.network/api/tokens/pairs')
    let tokensInformation = await request.json()
    let ETH_KNC_INFO = tokensInformation['ETH_KNC']
    console.log(ETH_KNC_INFO)
};

export const instantiateKyber = async ({ wallet }) => {
  try {
    const initializedWallet = new ethers.Wallet(wallet.privateKey, provider);
    const kyberNetworkContract = await new ethers.Contract(kyberAddress, kyberAbi, initializedWallet);
  } catch (err) {
    console.log({ err });
  }
};

export const some = () => {

};
