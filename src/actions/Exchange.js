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
          console.log({res});
        dispatch({ type: FETCHING_TRADING_PAIRS_DATA_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: FETCHING_TRADING_PAIRS_FAIL, payload: err.data });
      });
  };
}
