import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import {
	Text,
	View,
	TouchableOpacity,
	Image,
	Platform,
	StyleSheet,
	SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import WineDetail from "containers/wine-detail";

// import AppLoader from '../components/loading';
import ScanError from "../components/scan-error";
import PhotoDetail from "../components/photo-detail";

import * as ImageManipulator from "expo-image-manipulator";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

import { withNavigationFocus } from "react-navigation";

import moment from "moment";

import { SCAN_API_URL, SHOP_API, SHOP_API_UNLOGGED } from "@env";

class CameraExample extends Component {
	static navigationOptions = {
		tabBarVisible: false,
		headerShown: false,
	};

	state = {
		userToken: "",
		isLogged: false,
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		isErrorVisible: false,
		isModalVisible: false,
		isLoaderVisible: false,
		isPhotoVisible: false,
		scanInfo: [],
		wineInfo: [],
		newPhoto: false,
		displayPic: null,
		isUpdated: false,
		photoID: "",
	};

	componentDidMount = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		let userToken = await AsyncStorage.getItem("userToken");

		let wines = await AsyncStorage.getItem("WINES");
		let parseWines = JSON.parse(wines);

		this.setState({
			hasCameraPermission: status === "granted",
			scanInfo: wines ? parseWines : "",
			userToken,
			isLogged: userToken ? true : false,
		});

	};

	_takePicture = async () => {
		this._toggleLoader();
		await this.camera
			.takePictureAsync({ quality: 0.5, skipProcessing: false })
			.then(photo => {
				console.log(photo.uri);
				this._resizeImage(photo);
			});
	};

	_resizeImage = async photo => {
		let resizedPhoto = await ImageManipulator.manipulateAsync(
			photo.uri,
			[{ resize: { width: 1002, height: 1336 } }],
			{ compress: 0.5, format: "jpeg", base64: false }
		);
		this.setState(
			{
				isPhotoVisible: true,
				photo: photo.uri,
				photoID: null,
			},
			() => {
				data = new FormData();
				data.append("image", {
					name: "testaezzaedsdsg.jpg",
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
						console.log("upload succes", response);
						let userToken = this.state.userToken;

						this.setState(
							{
								photoID: response.id,
							},
							() => {
								if (response.id !== 0) {
									this._getScanProduct(
										userToken,
										response.id
									);
								}
							}
						);
					})
					.catch(error => {
						console.log("upload error", error);
					});
			}
		);
	};

	_storeData = async array => {
		let userToken = this.state.userToken;
		try {
			await AsyncStorage.setItem("WINES", JSON.stringify(array));
			this.props.navigation.navigate(userToken ? "Wines" : "Scan");
		} catch (error) {
			console.log("not working");
			// Error saving data
		}
	};

	_getScanProduct = (token, product_id) => {
		let url = token
			? `${SHOP_API}/${token}/${product_id}`
			: `${SHOP_API_UNLOGGED}/${product_id}`;
		axios({
			method: "get",
			url: url,
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				TOKEN: "MyTestToken",
			},
		})
			.then(response => {
				let scanInfo = this.state.scanInfo ? this.state.scanInfo : [];
				let newDate = {
					added_at: moment().format("YYYY-MM-DD HH:mm:ss"),
				};
				let newInfo = _.assign(response.data, newDate);

				scanInfo.push(newInfo);

				this.setState({
					scanInfo: scanInfo.reverse(),
					wineInfo: response.data,
					isUpdated: true,
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	_isUpdated = () => {
		if (this.state.photoID !== 0) {
			this.setState(
				{
					isPhotoVisible: false,
				},
				() => {
					this._toggleModal();
					this._storeData(this.state.scanInfo);
				}
			);
		} else {
			this.setState({
				isPhotoVisible: false,
				isErrorVisible: true,
			});
		}
	};

	_toggleModal = () => {
		this.setState({
			isModalVisible: !this.state.isModalVisible,
		});
	};

	_toggleLoader = () => {
		this.setState({
			isLoaderVisible: !this.state.isLoaderVisible,
		});
	};

	_toggleScanError = () => {
		this.setState({
			isErrorVisible: !this.state.isErrorVisible,
		});
	};

	renderNoPermissions = () => <Text>No access to camera</Text>;

	render() {
		const {
			userToken,
			hasCameraPermission,
			isErrorVisible,
			isModalVisible,
			isPhotoVisible,
			photo,
			photoID,
			wineInfo,
		} = this.state;
		const { isFocused } = this.props;

		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			{
				this.renderNoPermissions();
			}
		} else {
			return (
				<SafeAreaView style={styles.cameraContainer}>
					{isFocused && (
						<Camera
							ratio="16:9"
							style={styles.cameraContainer}
							type={this.state.type}
							ref={ref => {
								this.camera = ref;
							}}
						>
							<View style={styles.cameraView}>
								<View style={styles.cameraBottomBar}>
									<TouchableOpacity
										style={styles.cameraBack}
										onPress={() =>
											this.props.navigation.goBack()
										}
									>
										<Text style={styles.cameraBackText}>
											Annuler
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => this._takePicture()}
									>
										<Image
											source={require("../assets/icons/camera_takepic.png")}
											style={styles.cameraIcon}
										/>
									</TouchableOpacity>
								</View>
							</View>
						</Camera>
					)}
					<ScanError
						isVisible={isErrorVisible}
						close={() => this.setState({ isErrorVisible: false })}
					/>
					<PhotoDetail
						isVisible={isPhotoVisible}
						data={photo}
						id={photoID}
						action={() => this._isUpdated()}
						close={() => this.setState({ isPhotoVisible: false })}
					/>
					<WineDetail
						data={wineInfo}
						token={userToken}
						isVisible={isModalVisible}
						close={this._toggleModal}
					/>
				</SafeAreaView>
			);
		}
	}
}

export default withNavigationFocus(CameraExample);

const styles = StyleSheet.create({
	cameraContainer: {
		flex: 1,
	},
	cameraView: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: "transparent",
	},
	cameraBottomBar: {
		backgroundColor: "#FFF",
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: 20,
		height: 100,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	cameraBack: {
		position: "absolute",
		left: 20,
		top: 40,
	},
	cameraBackText: {
		fontSize: 16,

		color: "#37474F",
	},
	cameraIcon: {
		width: 65,
		height: 65,
	},
});
