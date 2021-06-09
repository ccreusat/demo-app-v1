import {
    POST_CREATE_SUCCESS,
    POST_CREATE_FALSE,
    OPEN_PICKER,
    CLOSE_PICKER
} from '../actions/createActions';

const initialState = {
    user_token: null,
    error: false
}

const createReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CREATE_SUCCESS:
        return {
            ...state,
            user_token: action.user_token,
            error: action.error
        }
    case POST_CREATE_FALSE:
        return {
            ...state,
            error: action.error
        }
    case OPEN_PICKER:
        return {
            ...state,
            isPickerVisible: action.isPickerVisible
        }
    case CLOSE_PICKER:
        return {
            ...state,
            isPickerVisible: action.isPickerVisible
        }
    default:
      return state
  }
};

export default createReducer;