import { FETCH_DASHBOARD, FETCH_DASHBOARD_DONE } from '../actions/mainActions';

const initialState = {
    initialState: null,
    isLoaderVisible: true
}

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DASHBOARD:
        return {
            ...state,
            dashboard: action.dashboard,
            isLoaderVisible: action.isLoaderVisible
        }
    case FETCH_DASHBOARD_DONE:
        return {
            ...state,
            isLoaderVisible: action.isLoaderVisible
        }
    default:
      return state
  }
};

export default mainReducer;