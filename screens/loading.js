import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { withNavigation } from "react-navigation";

class Loading extends Component {
	static navigationOptions = {
		headerShown: false,
	};

	state = {
		userToken: "",
		isReady: true,
		loadingImage: require("assets/images/loading/loader.gif"),
	};

	componentDidMount = async () => {
		let userToken = await AsyncStorage.getItem("userToken");

		this.setState({ userToken });
	};

	render() {
		const { isReady, loadingImage, userToken } = this.state;

		if (isReady) {
			return (
				<AppLoading
					startAsync={this._cacheResourcesAsync}
					onFinish={() =>
						this.props.navigation.navigate(
							userToken ? "Main" : "Start"
						)
					}
					onError={console.warn}
				/>
			);
		}

		return (
			<View style={styles.container}>
				<Image
					source={loadingImage}
					style={{ width: 400, height: 400 }}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	loadingImage: {
		width: 400,
		height: 400,
	},
});

export default Loading;
