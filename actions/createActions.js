import axios from "axios";

import { CREATE_API_URL, API_TOKEN } from "@env";

export const POST_CREATE_SUCCESS = "POST_CREATE_SUCCESS";
export const POST_CREATE_FALSE = "POST_CREATE_FALSE";
export const OPEN_PICKER = "OPEN_PICKER";
export const CLOSE_PICKER = "CLOSE_PICKER";

export function createUser(data) {
	return function (dispatch) {
		axios({
			method: "post",
			url: CREATE_API_URL,
			data: data,
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				Accept: "application/json",
				TOKEN: API_TOKEN,
			},
		})
			.then(response => {
				if (response.data.success === true) {
					dispatch({
						type: POST_CREATE_SUCCESS,
						user_token: response.data.app_user_token,
					});
				} else {
					dispatch({
						type: POST_CREATE_FALSE,
						error: true,
					});
				}
			})
			.catch(error => {
				console.log(error);
			});
	};
}

export function openDatePickeriOS() {
	return function (dispatch) {
		dispatch({
			type: OPEN_PICKER,
			isPickerVisible: true,
		});
	};
}

export function closeDatePickeriOS() {
	return function (dispatch) {
		dispatch({
			type: CLOSE_PICKER,
			isPickerVisible: false,
		});
	};
}
