import axios from "axios";
import _ from "lodash";

import { PROFILE_API_URL, RECO_API_URL, API_TOKEN } from "@env";

export const FETCH_PROFILE_INFO = "FETCH_PROFILE_INFO";
export const FETCH_PROFILE_DONE = "FETCH_PROFILE_DONE";
export const FETCH_RECOMMENDATIONS = "FETCH_RECOMMENDATIONS";
export const FETCH_RECOMMENDATIONS_ERROR = "FETCH_RECOMMENDATIONS_ERROR";

export function getProfile(token) {
	return function (dispatch) {
		axios({
			method: "get",
			url: `${PROFILE_API_URL}/${token}`,
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				Accept: "application/json",
				TOKEN: API_TOKEN,
			},
		})
			.then(response => {
				dispatch({
					type: FETCH_PROFILE_INFO,
					profile: response.data.labels_data,
					color: response.data.label_favourite.toUpperCase(),
					isLoaderVisible: true,
				});
			})
			.catch(error => {
				console.log("error", error);
			})
			.finally(function () {
				dispatch({
					type: FETCH_PROFILE_DONE,
					isLoaderVisible: false,
				});
			});
	};
}

export function getReco(token) {
	return function (dispatch) {
		axios({
			method: "get",
			url: `${RECO_API_URL}/${token}`,
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				Accept: "application/json",
				TOKEN: "MyTestToken",
			},
		})
			.then(response => {
				const omitData = _.omit(response.data, "success");
				const winesData = _.values(omitData);
				dispatch({
					type: FETCH_RECOMMENDATIONS,
					recoWines: winesData.slice(0, 3),
					recoVisible: _.isEmpty(winesData) ? false : true,
				});
			})
			.catch(error => {
				console.log("error", error);
				dispatch({
					type: FETCH_RECOMMENDATIONS_ERROR,
					recoVisible: false,
				});
			});
	};
}
