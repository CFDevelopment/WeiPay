import React, { Component } from 'react';
import {
  View, TouchableWithoutFeedback, StyleSheet, Text, Keyboard, Dimensions, SafeAreaView, ScrollView, FlatList,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import LinearButton from '../../../components/linearGradient/LinearButton';
import ClearButton from '../../../components/linearGradient/ClearButton';
import BoxShadowCard from '../../../components/shadowCards/BoxShadowCard';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import { instantiateKyber } from '../../../scripts/exchange/exchangeInit';
import { fetchKyberTradingPairs } from '../../../actions/Exchange';

const ethers = require('ethers');

class TradingPairDetails extends Component {

    state = {
      selectedTradingData: this.props.navigation.state.params.tradingPairData,
    };

    navigateToPin = () => {
      const navigateToPassword = NavigationActions.navigate({
        routeName: 'mainstack',
      });
      this.props.navigation.dispatch(navigateToPassword);
    };

    componentDidMount = () => {
      console.log(this.state.selectedTradingData);
    }

    getExchangeRate = async () => {
        //instantiate contract 
        //invoke method
        console.log('before');
        const kyberContract = await instantiateKyber(this.props.wallet);
        console.log({kyberContract});

        const src = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'; // ETH
        const dest = '0xdd974D5C2e2928deA5F71b9825b8b646686BD200'; // KNC
        //const srcQty = new web3.utils.BN('3000000000000000000000')
      
        try {
          const srcQty = ethers.utils.bigNumberify('3000000000000000000000');
          console.log(srcQty);
          let result = await kyberContract.getExpectedRate(
            src,
            dest,
            srcQty,
        ).call();
        } catch (err) {
          console.log({err});
        }
    

        console.log({result});
        

        // const ETH_TOKEN_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
        // const KNC_TOKEN_ADDRESS = '';

        // let result = await kyberContract.methods.getExpectedRate(
        //   ETH_TOKEN_ADDRESS, //ERC20 src
        //   KNC_TOKEN_ADDRESS,  //ERC20 dest
        //   ETH_WEI_PRICE //uint srcQty
        //   ).call()

    }

    render() {
      const {
        name,
        quoteVolume,
        symbol,
        baseVolume,
        contractAddress,
        key,
        lastPrice,
        lastTimestamp,
      } = this.state.selectedTradingData;

      return (
        <SafeAreaView style={styles.safeAreaView}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer} >
              <View style={styles.navContainer}>
                <BackWithMenuNav
                  showMenu={false}
                  showBack={true}
                  navigation={this.props.navigation}
                  backPage={'createOrRestore'}
                />
              </View>
              <Text style={styles.textHeader} >Trading Pair Details</Text>
              <View style={styles.tradingDetailsContainer} >
                <Text>Trading Pair: {key} </Text>
                <Text>Name: { name } </Text>
                <Text>Symbol: { symbol } </Text>
                <Text>Base Volume: { baseVolume } </Text>
                <Text>Quote Volume: { quoteVolume } </Text>
                <Text>Contract Address: { contractAddress } </Text>
                <Text>Last Price: { lastPrice } </Text>
                <Text>Last Timestamp: { lastTimestamp } </Text>

                <Text> Get most recent exchange rate </Text>
                <ClearButton
                  onClickFunction={this.getExchangeRate}
                  buttonText="Get Current Rate"
                  customStyles={styles.button}
                  buttonStateEnabled= { this.props.testWalletName === null && this.props.tempWalletName === null }
                />
              </View>

              <View style={styles.btnContainer}>
                <LinearButton
                  onClickFunction={this.navigateToPin}
                  buttonText="Next"
                  customStyles={styles.button}
                  buttonStateEnabled= { this.props.testWalletName === null && this.props.tempWalletName === null }
                />
                <View style={styles.footerGrandparentContainer} >
                  <View style={styles.footerParentContainer} >
                    <Text style={styles.textFooter} >Powered by ChainSafe </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      );
    }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fafbfe'
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fafbfe',
    width: '100%',
  },
  tradingDetailsContainer: {
    flex: 4,
    backgroundColor: 'yellow',
    padding: '9%',
  },
  navContainer: {
    flex: 0.65,
  },
  boxShadowContainer: {
    alignItems: 'center',
    flex: 2.5,
  },
  textHeader: {
    fontFamily: 'Cairo-Light',
    fontSize: RF(4),
    letterSpacing: 0.8,
    paddingLeft: '9%',
    color: '#1a1f3e',
    flex: 0.5,
    backgroundColor: 'blue',
  },
  contentContainer: {
    flex: 1,
    width: '82%',
  },
  cardText: {
    paddingBottom: '15%',
    paddingTop: '10%',
    paddingLeft: '10%',
    paddingRight: '10%',
    fontFamily: 'WorkSans-Light',
    letterSpacing: 0.4,
    lineHeight: RF(3.9),
    color: '#000000',
    fontSize: RF(2.4),
  },
  txtWalletName: {
    width: '100%',
    flexWrap: 'wrap',
    color: '#12c1a2',
    letterSpacing: 0.4,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    borderBottomWidth: 0.001,
  },
  formInputContainer: {
    width: '90%',
    marginLeft: '5%',
  },
  btnContainer: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'green',
  },
  button: {
    width: '82%',
    height: Dimensions.get('window').height * 0.082,
  },
  footerGrandparentContainer: {
    alignItems: 'center',
    marginBottom: '5%',
    marginTop: '5%',
  },
  footerParentContainer: {
    alignItems: 'center',
  },
  textFooter: {
    fontFamily: 'WorkSans-Regular',
    fontSize: RF(1.7),
    color: '#c0c0c0',
    letterSpacing: 0.5
  },
  defaultGreenColor: {
    color: '#12c1a2'
  },
});

/**
 * This method is not being used here
 * @param {Object} param
 */
const mapStateToProps = ({ newWallet, HotWallet, Exchange, Wallet }) => {
  const wallet = HotWallet.hotWallet;
  const debugMode = newWallet.debugMode;
  const { kyberTradingData } = Exchange;
  const { tokenConversions } = Wallet;
  return { wallet, debugMode, kyberTradingData, tokenConversions };
};

export default connect(mapStateToProps, { fetchKyberTradingPairs })(TradingPairDetails);
