import axios from "axios";

import { QUIZ_API_POST, API_TOKEN } from "@env";

export const FETCH_QUIZZ_SUCCESS = "FETCH_QUIZZ_SUCCESS";
export const FETCH_QUIZZ_ERROR = "FETCH_QUIZZ_ERROR";
export const GET_RED_VALUE = "GET_RED_VALUE";
export const GET_WHITE_VALUE = "GET_WHITE_VALUE";
export const GET_QUIZZ_VALUE = "GET_QUIZZ_VALUE";
export const GET_PRICE_VALUE = "GET_PRICE_VALUE";

export function quizzUpload(data) {
	return function (dispatch) {
		axios({
			method: "post",
			url: `${QUIZ_API_POST}`,
			data: JSON.stringify(data),
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				Accept: "application/json",
				TOKEN: API_TOKEN,
			},
		})
			.then(response => {
				dispatch({
					type: FETCH_QUIZZ_SUCCESS,
					resultQuizz: [response.data],
				});
			})
			.catch(error => {
				console.log("error", error);
			});
	};
}

export function updateValue(id, value) {
	return function (dispatch) {
		dispatch({
			type: GET_QUIZZ_VALUE,
			id: id,
			value: value,
			selectedItem: value,
		});
	};
}

export function updateRedWine(id, value) {
	return function (dispatch) {
		dispatch({
			type: GET_RED_VALUE,
			id: id,
			value: value,
			selectedRedWine: value,
		});
	};
}
export function updateWhiteWine(id, value) {
	return function (dispatch) {
		dispatch({
			type: GET_WHITE_VALUE,
			id: id,
			value: value,
			selectedWhiteWine: value,
		});
	};
}

export function updatePrice(id, value, token) {
	return function (dispatch) {
		dispatch({
			type: GET_PRICE_VALUE,
			id: id,
			value: value,
			selectedPrice: value,
			token: token,
		});
	};
}
