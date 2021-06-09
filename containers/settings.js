import React, { Component } from "react";
import _ from "lodash";
import {
	Image,
	StyleSheet,
	Linking,
	Platform,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import SignOut from "../components/signout";
import Transition from "../components/transition";

import * as IntentLauncher from "expo-intent-launcher";

export default class Settings extends Component {
	static navigationOptions = { title: "Customer dashboard" };

	state = {
		userToken: "",
		notificationValue: false,
		isTransitionVisible: false,
		externalLink: "",
	};

	componentDidMount = async () => {
		let userToken = await AsyncStorage.getItem("userToken");

		this.setState({ userToken });
	};

	_toggleTransition = value => {
		this.setState({
			isTransitionVisible: !this.state.isTransitionVisible,
			externalLink: value,
		});
	};

	openSetting = () => {
		if (Platform.OS == "ios") {
			Linking.openURL("app-settings:");
		} else {
			IntentLauncher.startActivityAsync(
				IntentLauncher.ACTION_NOTIFICATION_SETTINGS
			);
		}
	};

	render() {
		const { isTransitionVisible, externalLink } = this.state;

		const storeApp = Platform.OS === "android" ? "" : "";

		return (
			<View style={styles.container}>
				<TouchableOpacity
					onPress={() => this.openSetting()}
					style={styles.settingsRow}
				>
					<Text>Disable notifications</Text>
					<Image
						source={require("assets/icons/baseline_chevron_right_black.png")}
						style={styles.settingsChevron}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => this._toggleTransition(storeApp)}
					style={styles.settingsRow}
				>
					<Text>Rate the app</Text>
					<Image
						source={require("assets/icons/baseline_chevron_right_black.png")}
						style={styles.settingsChevron}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() =>
						this._toggleTransition(
							"https://www.lepetitballon.com/faq/"
						)
					}
					style={styles.settingsRow}
				>
					<Text>FAQ / Help</Text>
					<Image
						source={require("assets/icons/baseline_chevron_right_black.png")}
						style={styles.settingsChevron}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() =>
						this._toggleTransition(
							"https://www.lepetitballon.com/vieprivee/"
						)
					}
					style={styles.settingsRow}
				>
					<Text>Privacy</Text>
					<Image
						source={require("assets/icons/baseline_chevron_right_black.png")}
						style={styles.settingsChevron}
					/>
				</TouchableOpacity>

				<SignOut />

				<Transition
					link={externalLink}
					isVisible={isTransitionVisible}
					close={() => this.setState({ isTransitionVisible: false })}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	settingsRow: {
		position: "relative",
		height: 70,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 20,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#ECEFF1",
	},
	settingsText: {
		fontSize: 14,

		lineHeight: 18,
	},
	settingsChevron: {
		// position: 'absolute',
		// right: 10,
		// top: '50%',
		// marginTop: -15,
		width: 30,
		height: 30,
	},
});
