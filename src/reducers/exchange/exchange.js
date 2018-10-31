import {
  FETCHING_TRADING_PAIRS_DATA,
  FETCHING_TRADING_PAIRS_DATA_SUCCESS,
  FETCHING_TRADING_PAIRS_FAIL,
} from '../../actions/ExchangeTypes';

const INITIAL_STATE = {
  kyberTradingData: null,
  isFetching: true,
  hasError: false,
  errorMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCHING_TRADING_PAIRS_DATA:
      return {
        ...state, isFetching: true, hasError: false, errorMessage: null,
      };
    case FETCHING_TRADING_PAIRS_DATA_SUCCESS:
      return {
        ...state, isFetching: false, hasError: false, errorMessage: null, kyberTradingData: action.payload,
      };
    case FETCHING_TRADING_PAIRS_FAIL:
      return {
        ...state, isFetching: false, hasError: true, errorMessage: action.payload,
      };
    default:
      return state;
  }
};
