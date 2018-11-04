import axios from 'axios';

import {
  FETCHING_TRADING_PAIRS_DATA,
  FETCHING_TRADING_PAIRS_DATA_SUCCESS,
  FETCHING_TRADING_PAIRS_FAIL,
} from './ExchangeTypes';

import { kyberTradingPairsRequest } from '../constants/Api';

export function fetchKyberTradingPairs() {
    console.log('in fetch kyber action creator');
  return (dispatch) => {
    dispatch({ type: FETCHING_TRADING_PAIRS_DATA });
    return axios.get(kyberTradingPairsRequest)
      .then((res) => {
          const { data } = res;
          let tradingData = [];
          let count = 0;
          for (var key in data) {
            let tradingItem = {};
            tradingItem.key = key;
            tradingItem.baseVolume = data[key]['baseVolume'];
            tradingItem.contractAddress = data[key]['contractAddress'];
            tradingItem.currentPrice = data[key]['currentPrice'];
            tradingItem.lastPrice = data[key]['lastPrice'];
            tradingItem.lastTimestamp = data[key]['lastTimestamp'];
            tradingItem.name = data[key]['name'];
            tradingItem.quoteVolume = data[key]['quoteVolume'];
            tradingItem.symbol = data[key]['symbol'];
            tradingItem.index = count;
            count++;
            tradingData.push(tradingItem);
          }
        dispatch({ type: FETCHING_TRADING_PAIRS_DATA_SUCCESS, payload: tradingData });
      })
      .catch((err) => {
        dispatch({ type: FETCHING_TRADING_PAIRS_FAIL, payload: err.data });
      });
  };
}
