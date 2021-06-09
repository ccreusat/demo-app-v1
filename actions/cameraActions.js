import _ from "lodash";
import { Platform } from "react-native";
import { Permissions, ImageManipulator } from "expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export const GET_WINES = "GET_WINES";
export const GET_PERMISSION = "GET_PERMISSION";
export const GET_PICTURE = "GET_PICTURE";
export const SEND_PICTURE = "SEND_PICTURE";
export const UPDATE_SCAN = "UPDATE_SCAN";
export const STORE_WINES = "STORE_WINES";
export const STORE_ERROR = "STORE_ERROR";
export const ERROR_PICTURE = "ERROR_PICTURE";
export const OPEN_ERROR = "OPEN_ERROR";
export const CLOSE_ERROR = "CLOSE_ERROR";
export const CLOSE_PHOTO = "CLOSE_PHOTO";

import { SCAN_API_URL } from "@env";

export function getPermission() {
	return async function (dispatch) {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		dispatch({
			type: GET_PERMISSION,
			hasCameraPermission: status === "granted",
		});
	};
}

export function getWines() {
	return async function (dispatch) {
		let wines = await AsyncStorage.getItem("WINES");
		let parseWines = JSON.parse(wines);

		dispatch({
			type: GET_WINES,
			scanInfo: wines ? parseWines : "",
		});
	};
}

export function getPicture(ref) {
	return async function (dispatch) {
		console.log("in");
		await ref
			.takePictureAsync({ quality: 0.5, skipProcessing: false })
			.then(photo => {
				dispatch({
					type: GET_PICTURE,
					photo: photo.uri,
				});
			});
	};
}

export function sendPicture(photo) {
	return async function (dispatch) {
		let resizedPhoto = await ImageManipulator.manipulateAsync(
			photo,
			[{ resize: { width: 1002, height: 1336 } }],
			{ compress: 0.5, format: "jpeg", base64: false }
		);

		data = new FormData();
		data.append("image", {
			name: "xxxxxx.jpg",
			type: "image/jpeg",
			uri:
				Platform.OS === "android"
					? resizedPhoto.uri
					: resizedPhoto.uri.replace("file://", ""),
		});

		fetch(SCAN_API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			body: data,
		})
			.then(response => response.json())
			.then(response => {
				if (response.id !== 0) {
					dispatch({
						type: SEND_PICTURE,
						id: response.id,
						success: true,
						isPhotoVisible: true,
					});
				} else {
					dispatch({
						type: ERROR_PICTURE,
						success: false,
						isPhotoVisible: true,
					});
				}
			})
			.catch(error => {
				console.log("upload error", error);
			});
	};
}

export function updateScanInfo(array, wineInfo) {
	return function (dispatch) {
		let scanInfo = array ? array : [];
		let newDate = { added_at: moment().format("YYYY-MM-DD HH:mm:ss") };
		let newInfo = _.assign(wineInfo, newDate);

		scanInfo.push(newInfo);

		dispatch({
			type: UPDATE_SCAN,
			scanInfo: scanInfo.reverse(),
			isUpdated: true,
			isPhotoVisible: false,
		});
	};
}

export function storeData(array) {
	return async function (dispatch) {
		try {
			await AsyncStorage.setItem("WINES", JSON.stringify(array));

			dispatch({
				type: STORE_WINES,
				isSetItem: true,
			});
		} catch (error) {
			dispatch({
				type: STORE_ERROR,
				isSetItem: false,
			});
		}
	};
}

export function openError() {
	return function (dispatch) {
		dispatch({
			type: OPEN_ERROR,
			isErrorVisible: true,
			isPhotoVisible: false,
		});
	};
}

export function closeError() {
	return function (dispatch) {
		dispatch({
			type: CLOSE_ERROR,
			isErrorVisible: false,
		});
	};
}

export function closePhoto() {
	return function (dispatch) {
		dispatch({
			type: CLOSE_PHOTO,
			isPhotoVisible: false,
		});
	};
}
