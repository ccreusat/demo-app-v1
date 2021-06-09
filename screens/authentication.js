import React, { Component } from "react";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Platform,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import Separator from "../components/separator";

export default class Authentication extends Component {
	static navigationOptions = {
		headerShown: false,
		tabBarVisible: false,
	};

	render() {
		return (
			<LinearGradient
				colors={["#9BD2D7", "#82C7CD"]}
				style={styles.container}
			>
				<View style={[styles.container, { padding: 25 }]}>
					<View style={[styles.appContainer, { padding: 30 }]}>
						<View style={styles.logoContainer}>
							<Image
								source={require("../assets/images/logo.png")}
								style={styles.logoImage}
							/>
						</View>
						<Text style={styles.appTitle}>
							Lorem ipsum dolor sit amet, consectetur elit ?
						</Text>
						<Text style={styles.appText}>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit, sed do eiusmod tempor incididunt ut labore et
							dolore magna aliqua
						</Text>
						<View
							style={[styles.buttonContainer, { marginTop: 30 }]}
						>
							<TouchableOpacity
								style={[
									styles.Button,
									{
										backgroundColor: "#3FA9B4",
										marginTop: 10,
									},
								]}
								onPress={() =>
									this.props.navigation.navigate("Login")
								}
							>
								<Image
									source={require("../assets/icons/lpb.png")}
									style={styles.ButtonIcon}
								/>
								<Text
									style={[
										styles.ButtonText,
										{ paddingLeft: 54 },
									]}
								>
									Login
								</Text>
							</TouchableOpacity>
						</View>
						<Separator />
						<View style={styles.buttonContainer}>
							<TouchableOpacity
								style={[styles.Button, styles.ButtonOutline]}
								onPress={() =>
									this.props.navigation.navigate(
										"CreateAccount"
									)
								}
							>
								<Text
									style={[
										styles.ButtonText,
										styles.ButtonOutlineText,
									]}
								>
									Register
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<TouchableOpacity
						onPress={() => this.props.navigation.navigate("Scan")}
						underlayColor="white"
					>
						<Text style={styles.appLink}>Continue as a Guest</Text>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	appContainer: {
		position: "relative",
		marginTop: 20,
		borderRadius: 10,
		backgroundColor: "#fff",
		width: "100%",
		...Platform.select({
			ios: {
				shadowColor: "#000",
				shadowOffset: { height: 2, width: 0 },
				shadowOpacity: 0.35,
				shadowRadius: 0.6,
			},
			android: {
				elevation: 1,
			},
		}),
	},
	logoContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: -80,
	},
	logoImage: {
		width: 120,
		height: 120,
		justifyContent: "center",
	},
	appTitle: {
		marginTop: 20,
		marginBottom: 10,

		fontSize: 22,
		lineHeight: 28,
		textAlign: "center",
	},
	appText: {
		fontSize: 12,
		lineHeight: 18,
		textAlign: "center",
	},
	Button: {
		height: 54,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	ButtonIcon: {
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		width: 56,
		height: 54,
		// borderWidth: 1,
		// borderTopWidth: 0,
		// borderColor: 'rgba(255,255,255,0.50)'
	},
	ButtonText: {
		color: "#fff",

		fontSize: 16,
		textAlign: "center",
	},
	ButtonOutline: {
		borderWidth: 1,
		borderColor: "#37474F",
	},
	ButtonOutlineText: {
		color: "#37474F",
	},
	loadingImage: {
		width: 400,
		height: 400,
	},
	appLink: {
		marginTop: 20,

		fontSize: 14,
		color: "#fff",
		textDecorationLine: "underline",
	},
});
