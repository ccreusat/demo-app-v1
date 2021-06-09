import axios from "axios";

import { CUSTOMER_API_URL, API_TOKEN } from "@env";

export const FETCH_GET_SUCCESS = "FETCH_GET_SUCCESS";
export const FETCH_UPDATE_REQUEST = "FETCH_UPDATE_REQUEST";
export const ACCOUNT_UPDATE_SUCCESS = "ACCOUNT_UPDATE_SUCCESS";
export const ACCOUNT_UPDATE_ERROR = "ACCOUNT_UPDATE_ERROR";

export const OPEN_PICKER = "OPEN_PICKER";
export const CLOSE_PICKER = "CLOSE_PICKER";

export function getUser(token) {
	return function (dispatch) {
		axios({
			method: "get",
			url: `${CUSTOMER_API_URL}/${token}`,
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				Accept: "application/json",
				TOKEN: API_TOKEN,
			},
		})
			.then(response => {
				dispatch({
					type: FETCH_GET_SUCCESS,
					firstname: response.data.firstname,
					lastname: response.data.lastname,
					old_password: "******",
					password_hash: response.data.password_hash,
					email: response.data.email,
					dob: response.data.dob,
					optin_intern: response.data.optin_intern,
					optin_extern: response.data.optin_extern,
					label: response.data.label_favourite
						? response.data.label_favourite
						: "DEFAULT",
				});
			})
			.catch(error => {
				console.log("error", error);
			});
	};
}

export function updateUser(data) {
	return function (dispatch) {
		axios({
			method: "put",
			url: `${CUSTOMER_API_URL}/${data.user_token}`,
			data: data,
			headers: {
				Authorization: "XXXXX",
				"Content-Type": "application/json",
				TOKEN: "XXXXXXXXX",
			},
		})
			.then(response => {
				dispatch({
					type: ACCOUNT_UPDATE_SUCCESS,
					success: response.data.success,
					error: false,
				});
			})
			.catch(error => {
				console.log(error);
				dispatch({
					type: ACCOUNT_UPDATE_ERROR,
					error: false,
				});
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
