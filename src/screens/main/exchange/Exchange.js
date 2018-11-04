import React, { Component } from 'react';
import {
  View, TouchableWithoutFeedback, StyleSheet, Text, Keyboard, Dimensions, SafeAreaView, ScrollView, FlatList,
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import RF from 'react-native-responsive-fontsize';
import LinearButton from '../../../components/linearGradient/LinearButton';
import BoxShadowCard from '../../../components/shadowCards/BoxShadowCard';
import BackWithMenuNav from '../../../components/customPageNavs/BackWithMenuNav';
import { instantiateKyber } from '../../../scripts/exchange/exchangeInit';
import { fetchKyberTradingPairs } from '../../../actions/Exchange';

const ethers = require('ethers');

/**
 * Initial setup screen used to allow the user to give their wallet a name after
 * a new wallet has been created
 */
class Exchange extends Component {
  /**
     * A new wallet is created, the wallet name is passed in along with usersWallets, which will be an 
     * empty array when user initially creates a wallet in setup.
     */
    state = {
      refresh: false,
      ds: null,
    };

    navigateToPin = () => {
      const navigateToPassword = NavigationActions.navigate({
        routeName: 'mainstack',
      });
      this.props.navigation.dispatch(navigateToPassword);
    };

    navigateToDetails = (tradingPairData) => {
      console.log({tradingPairData});
      const navigateToDetails= NavigationActions.navigate({
        routeName: 'tradingPairDetails',
        params: { tradingPairData },
      });
      this.props.navigation.dispatch(navigateToDetails);
    }

    componentDidMount = () => {
      this.props.fetchKyberTradingPairs();
    }

    handleListRefresh = async () => {
      console.log('do something in handle refresh');
    };

    renderRow = (tradingPairData) => {
      const { key, currentPrice } = tradingPairData;
      return (
        <TouchableWithoutFeedback onPress={()=>{this.navigateToDetails(tradingPairData);}}>
          <View style={{ backgroundColor:'white', padding:10, borderColor:'black', borderWidth: 0.5 }}>
            <Text>Trading Pair: {key} </Text>
            <Text>Conversion Price: {currentPrice} </Text>
            <Text>CAD: {currentPrice * this.props.tokenConversions['ETH']['CAD']} </Text>
          </View>
          </TouchableWithoutFeedback>
      );
    }

    render() {
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
              <Text style={styles.textHeader} >Exchange</Text>
              <View style={styles.scrollViewContainer} >
                <ScrollView style={styles.scrollView}>
                {
                  this.props.kyberTradingData === null
                  ? null
                  :            
                   <FlatList
                    data={this.props.kyberTradingData}
                    showsVerticalScrollIndicator={false}
                    renderItem= {({ item }) => { return this.renderRow(item); }}
                    keyExtractor= {(item) => {
                      return `${item.symbol}`;
                    }}
                    refreshing={this.state.refresh}
                    onRefresh={this.handleListRefresh}
                    extraData={this.props}
                    // style={{ flex: 1 }}
                  />
                }
                </ScrollView>
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
  scrollViewContainer: {
    flex: 4,
    // paddingBottom: '2.5%',
    // paddingTop: '2.5%',
    backgroundColor: 'yellow',
  },
  scrollView: {
    height: '60%',
    backgroundColor: 'purple',
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

export default connect(mapStateToProps, { fetchKyberTradingPairs })(Exchange);