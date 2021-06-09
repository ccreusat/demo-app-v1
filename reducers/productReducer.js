import {
  FETCH_PRODUCT_INFO,
  CLOSE_MODAL
} from '../actions/productActions';

const initialState = {
  isModalVisible: false
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_INFO:
		return {
			wineInfo: action.wineInfo,
			isModalVisible: action.isModalVisible
		}
    case CLOSE_MODAL:
        return {
          wineInfo: action.wineInfo,
          isModalVisible: action.isModalVisible
        }
    default:
		return state
  }
};

export default productReducer;