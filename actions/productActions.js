import axios from "axios";

import { PRODUCT_INFO_API, PRODUCT_INFO_API_GUEST, API_TOKEN } from "@env";

export const FETCH_PRODUCT_INFO = "FETCH_PRODUCT_INFO";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const OPEN_TRANSITION = "OPEN_TRANSITION";
export const CLOSE_TRANSITION = "CLOSE_TRANSITION";

export function getProductInfo(token, product_id) {
	return function (dispatch) {
		let url = token
			? `${PRODUCT_INFO_API}/${token}/${product_id}`
			: `${PRODUCT_INFO_API_GUEST}/${product_id}`;
		axios({
			method: "get",
			url: url,
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				Accept: "application/json",
				TOKEN: API_TOKEN,
			},
		})
			.then(response => {
				dispatch({
					type: FETCH_PRODUCT_INFO,
					wineInfo: response.data,
					isModalVisible: true,
				});
			})
			.catch(error => {
				console.log("error", error);
			});
	};
}

export function closeModal() {
	return function (dispatch) {
		dispatch({
			type: CLOSE_MODAL,
			wineInfo: [],
			isModalVisible: false,
		});
	};
}
