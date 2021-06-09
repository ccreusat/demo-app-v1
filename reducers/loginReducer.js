import { FETCH_LOGIN_SUCCESS, FETCH_LOGIN_FALSE } from '../actions/loginActions';

const initialState = {
    userToken: null,
    isLogged: false,
    error: false
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOGIN_SUCCESS:
        return {
            ...state,
            userToken: action.userToken,
            isLogged: action.isLogged,
            error: action.error
        }
    case FETCH_LOGIN_FALSE:
        return {
            ...state,
            isLogged: action.isLogged,
            error: action.error
        }
    default:
      return state
  }
};

export default loginReducer;