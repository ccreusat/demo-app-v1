import axios from "axios";

import { DASHBOARD_API_URL, API_TOKEN } from "@env";

export const FETCH_DASHBOARD = "FETCH_DASHBOARD";
export const FETCH_DASHBOARD_DONE = "FETCH_DASHBOARD_DONE";

export function getDashboard(token) {
	return function (dispatch) {
		axios({
			method: "get",
			url: `${DASHBOARD_API_URL}/${token}`,
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				Accept: "application/json",
				TOKEN: API_TOKEN,
			},
		})
			.then(response => {
				dispatch({
					type: FETCH_DASHBOARD,
					dashboard: response.data,
					isLoaderVisible: true,
				});
			})
			.catch(error => {
				console.log("error", error);
			})
			.finally(function () {
				dispatch({
					type: FETCH_DASHBOARD_DONE,
					isLoaderVisible: false,
				});
			});
	};
}
