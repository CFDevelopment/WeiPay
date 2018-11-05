import kyberAbi from '../../constants/data/json/kyberRopstenAbi';
// import provider from '../../constants/Providers';

const ethers = require('ethers');
const kyberAddressMainnet = '0x818E6FECD516Ecc3849DAf6845e3EC868087B755';
const kyberAddressRopsten = ''


export const instantiateKyber = async (walletObj, provider) => {
  console.log('we in?');

  const {wallet} = walletObj;
  console.log({wallet});
  console.log({provider});
  
  try {
    const initializedWallet = new ethers.Wallet(wallet.privateKey, provider);
    const kyberNetworkContract = await new ethers.Contract(kyberAddressMainnet, kyberAbi, initializedWallet);
    return kyberNetworkContract;
  } catch (err) {
    console.log({ err });
    return null;
  }
};

/**
 * need to get the address of src, so what are you sending?
 */
export const expectedRate = async () => {
  // let result = await kyberNetworkProxyContract.methods.getExpectedRate(
  //   ETH_TOKEN_ADDRESS, //ERC20 src
  //   KNC_TOKEN_ADDRESS,  //ERC20 dest
  //   ETH_WEI_PRICE //uint srcQty
  //   ).call()
};
