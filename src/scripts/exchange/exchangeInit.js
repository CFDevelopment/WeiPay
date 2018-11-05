import kyberAbi from '../../constants/data/json/kyberRopstenAbi';
import provider from '../../constants/Providers';

const ethers = require('ethers');
const kyberAddress = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';

export const instantiateKyber = async ({ wallet }) => {
  console.log('we in?');
  console.log({wallet});
  
  try {
    const initializedWallet = new ethers.Wallet(wallet.privateKey, provider);
    const kyberNetworkContract = await new ethers.Contract(kyberAddress, kyberAbi, initializedWallet);
    return kyberNetworkContract;
  } catch (err) {
    console.log({ err });
    return null;
  }
};

/**
 * need to get the address of src, so what are you sending?
 */
export const expectedRate = () => {
  let result = await kyberNetworkProxyContract.methods.getExpectedRate(
    ETH_TOKEN_ADDRESS, //ERC20 src
    KNC_TOKEN_ADDRESS,  //ERC20 dest
    ETH_WEI_PRICE //uint srcQty
    ).call()
};
