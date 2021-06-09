import {
    FETCH_GET_SUCCESS,
    ACCOUNT_UPDATE_SUCCESS,
    ACCOUNT_UPDATE_FALSE,
    OPEN_PICKER,
    CLOSE_PICKER
} from '../actions/accountActions';

const initialState = {
    error: false,
    isPickerVisible: false
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GET_SUCCESS:
        return {
            ...state,
            firstname: action.firstname,
            lastname: action.lastname,
            old_password: action.old_password,
            password_hash: action.password_hash,
            email: action.email,
            dob: action.dob,
            optin_intern: action.optin_intern,
            optin_extern: action.optin_extern,
            label: action.label
        }
    case ACCOUNT_UPDATE_SUCCESS:
        return {
            ...state,
            success: action.success,
            error: action.error
        }
    case ACCOUNT_UPDATE_FALSE:
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

export default accountReducer;