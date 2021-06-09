import {
    FETCH_PROFILE_INFO,
    FETCH_RECOMMENDATIONS,
    FETCH_RECOMMENDATIONS_ERROR,
    FETCH_PROFILE_DONE
} from '../actions/profileActions';

const initialState = {
    profile: null,
    color: null,
    isLoaderVisible: true,
    recoWines: null,
    recoVisible: false
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROFILE_INFO:
        return {
            ...state,
            profile: action.profile,
            color: action.color,
            isLoaderVisible: action.isLoaderVisible
        }
    case FETCH_PROFILE_DONE:
        return {
            ...state,
            isLoaderVisible: action.isLoaderVisible
        }
    case FETCH_RECOMMENDATIONS:
        return {
            ...state,
            recoWines: action.recoWines,
            recoVisible: action.recoVisible
        }
    case FETCH_RECOMMENDATIONS_ERROR:
        return {
            ...state,
            recoVisible: action.recoVisible
        }
    default:
      return state
  }
};

export default profileReducer;