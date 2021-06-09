import axios from "axios";
import { LOGIN_API_URL, API_TOKEN } from "@env";

export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";
export const FETCH_LOGIN_FALSE = "FETCH_LOGIN_FALSE";

import { signInAsync } from "./helpersActions";

export function loginUser(user) {
	return function (dispatch) {
		axios({
			method: "post",
			url: LOGIN_API_URL,
			data: user,
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				Accept: "application/json",
				TOKEN: `${API_TOKEN}`,
			},
		})
			.then(response => {
				if (response.data.success === true) {
					signInAsync(response.data.app_user_token);

					dispatch({
						type: FETCH_LOGIN_SUCCESS,
						userToken: response.data.app_user_token,
						isLogged: true,
						error: false,
					});
				} else {
					dispatch({
						type: FETCH_LOGIN_FALSE,
						isLogged: false,
						error: true,
					});
				}
			})
			.catch(error => {
				console.log("error", error);
			});
	};
}
