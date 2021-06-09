import {
    FETCH_QUIZZ_SUCCESS,
    GET_QUIZZ_VALUE,
    GET_RED_VALUE,
    GET_WHITE_VALUE,
    GET_PRICE_VALUE
} from '../actions/quizzActions';

const initialState = {
    staticResult: {
        "1_1": 1,
        "1_2": 1,
        "2": 1,
        "3": 1,
        "4": 1,
        "5": 1,
        "6": 1,
        "7_1": 1,
        "7_2": 1
    },
    selectedRedWine: 1,
    selectedWhiteWine: 1,
    selectedPrice:1,
    count: 0
}

const quizzReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_QUIZZ_SUCCESS:
        return {
            ...state,
            resultQuizz: action.resultQuizz
        }
    case GET_RED_VALUE:
        return {
            ...state,
            staticResult: { ...state.staticResult, [action.id]: parseInt(action.value) },
            selectedRedWine: action.selectedRedWine
        }
    case GET_WHITE_VALUE:
        return {
            ...state,
            staticResult: { ...state.staticResult, [action.id]: parseInt(action.value) },
            selectedWhiteWine: action.selectedWhiteWine
        }
    case GET_QUIZZ_VALUE:
        return {
            ...state,
            staticResult: { ...state.staticResult, [action.id]: parseInt(action.value) },
            count: state.count + 1
        }
    case GET_PRICE_VALUE:
        return {
            ...state,
            staticResult: { ...state.staticResult, [action.id]: parseInt(action.value), 'app_user_token':action.token },
            selectedPrice: action.selectedPrice
        }
    default:
      return state
  }
};

export default quizzReducer;