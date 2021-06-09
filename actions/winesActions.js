import axios from "axios";
import _ from "lodash";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { RECENT_WINE_API, PURCHASED_WINE_API, API_TOKEN } from "@env";

export const FETCH_RECENTS_WINES = "FETCH_RECENTS_WINES";
export const FETCH_PURCHASED_WINES = "FETCH_PURCHASED_WINES";
export const FETCH_SCAN = "FETCH_SCAN";

import { fromArrayToSectionData } from "../utils/arrayForSectionList";

export function getRecentWines(token) {
	return function (dispatch) {
		axios({
			method: "get",
			url: `${RECENT_WINE_API}/${token}`,
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				Accept: "application/json",
				TOKEN: API_TOKEN,
			},
		})
			.then(response => {
				const omitData = _.omit(response.data, "success");
				const winesData = _.values(omitData);
				dispatch({
					type: FETCH_RECENTS_WINES,
					recentsWines: fromArrayToSectionData(winesData),
				});
			})
			.catch(error => {
				console.log(error);
			});
	};
}

export function getPurchasedWines(token) {
	return function (dispatch) {
		axios({
			method: "get",
			url: `${PURCHASED_WINE_API}/${token}`,
			headers: {
				Authorization: "xxxxxx",
				"Content-Type": "application/json",
				TOKEN: "XXXXX",
			},
		})
			.then(response => {
				const omitData = _.omit(response.data, "success");
				const winesData = _.values(omitData);
				dispatch({
					type: FETCH_PURCHASED_WINES,
					purchasedWines: fromArrayToSectionData(winesData),
				});
			})
			.catch(error => {
				console.log(error);
			});
	};
}

export function getScanWines() {
	return async function (dispatch) {
		try {
			let wines = await AsyncStorage.getItem("WINES");
			let parseWines = JSON.parse(wines);
			let valuesWines = _.values(parseWines);
			let sectionWines = fromArrayToSectionData(valuesWines);

			if (wines) {
				dispatch({
					type: FETCH_SCAN,
					scanWines: sectionWines,
					isLoaderVisible: false,
				});
			}
		} catch (e) {
			console.log(e);
		}
	};
}
