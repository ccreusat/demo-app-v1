import {
  FETCH_RECENTS_WINES,
  FETCH_PURCHASED_WINES,
  FETCH_SCAN
} from '../actions/winesActions';

const initialState = {
  recentsWines: null,
  purchasedWines: null,
  scanWines: null,
  isLoaderVisible: true
}

const winesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECENTS_WINES:
      return {
        ...state,
        recentsWines: action.recentsWines
      }
    case FETCH_PURCHASED_WINES:
      return {
        ...state,
        purchasedWines: action.purchasedWines
      }
    case FETCH_SCAN:
      return {
        ...state,
        scanWines: action.scanWines,
        isLoaderVisible: action.isLoaderVisible
      }
    default:
      return state
  }
};

export default winesReducer;