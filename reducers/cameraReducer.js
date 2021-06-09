import {
    GET_PERMISSION,
    GET_PICTURE,
    SEND_PICTURE,
    ERROR_PICTURE,
    OPEN_ERROR,
    CLOSE_ERROR,
    CLOSE_PHOTO,
    GET_WINES,
    UPDATE_SCAN,
    STORE_WINES
} from '../actions/cameraActions';

const initialState = {
  isPhotoVisible: false,
  isErrorVisible: false,
  isUpdated: false,
  hasCameraPermission: null,
  success: null,
  isSetItem: false,
  id: ''
}

const cameraReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PERMISSION :
            return {
                ...state,
                hasCameraPermission: action.hasCameraPermission,
            }
        case GET_WINES :
            return {
                ...state,
                scanInfo: action.scanInfo,
            }
        case GET_PICTURE :
            return {
                ...state,
                photo: action.photo,
                data: action.data
            }
        case SEND_PICTURE :
            return {
                ...state,
                id: action.id,
                success: action.success,
                isPhotoVisible: action.isPhotoVisible,
            }
        case UPDATE_SCAN :
            return {
                ...state,
                scanInfo: action.scanInfo,
                isUpdated: action.isUpdated,
                isPhotoVisible: action.isPhotoVisible
            }
        case STORE_WINES : 
            return {
                ...state,
                isSetItem: action.isSetItem
            }
        case ERROR_PICTURE :
            return {
                ...state,
                success: action.success,
                isPhotoVisible: action.isPhotoVisible,
            }
        case OPEN_ERROR:
            return {
                ...state,
                isErrorVisible: action.isErrorVisible,
                isPhotoVisible: action.isPhotoVisible,
            }
        case CLOSE_ERROR:
            return {
                ...state,
                isErrorVisible: action.isErrorVisible,
            }
        case CLOSE_PHOTO:
            return {
                ...state,
                isPhotoVisible: action.isPhotoVisible,
            }
        default:
            return state
    }
};

export default cameraReducer;