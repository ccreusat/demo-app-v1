import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Platform,
	KeyboardAvoidingView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Input from "../components/input";
import Button from "../components/button";

import { connect } from "react-redux";

const PASSWORD_API_URL = "ENDPOINT";

class Forget extends Component {
	static navigationOptions = {
		title: "Forgot Password ?",
	};

	state = {
		errors: null,
		email: "",
		isLogged: false,
		displayError: false,
		displaySuccess: false,
	};

	_resetPost = () => {
		axios({
			method: "post",
			url: PASSWORD_API_URL,
			data: {
				email: this.state.email,
			},
			headers: {
				Authorization: "token-from-auth-api",
				"Content-Type": "application/json",
				TOKEN: "XXXXX",
			},
		}).then(() => {
			this.setState({
				displaySuccess: true,
				displayError: false,
			});
		});
	};

	_resetPassword = () => {
		if (!this.state.email) {
			this.setState({
				displayError: true,
				displaySuccess: false,
			});
		} else {
			this._resetPost();
		}
	};

	render() {
		const { email, displayError, displaySuccess } = this.state;

		return (
			<LinearGradient
				colors={["#9BD2D7", "#82C7CD"]}
				style={styles.container}
			>
				<KeyboardAvoidingView enabled behavior="position">
					<View style={styles.appContainer}>
						<View
							style={{
								overflow: "hidden",
								borderTopLeftRadius: 10,
								borderTopRightRadius: 10,
							}}
						>
							<Image
								source={require("../assets/images/illustration/forget.png")}
								style={styles.containerImage}
								resizeMethod="resize"
							/>
						</View>
						<View
							style={
								displayError || displaySuccess
									? [
											styles.formContainer,
											{ paddingBottom: 60 },
									  ]
									: styles.formContainer
							}
						>
							<Text style={styles.appText}>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eius
							</Text>
							<Input
								label="Email"
								capitalize="none"
								keyboardType="email-address"
								returnKeyType="done"
								value={email}
								action={email => this.setState({ email })}
								placeholder="Email"
							/>
							<View
								style={[
									styles.buttonContainer,
									{ marginTop: 20 },
								]}
							>
								<Button
									action={() => this._resetPassword()}
									color="#ED3436"
									colorText="#FFF"
									name="Confirm"
								/>
							</View>
							{displayError && (
								<View style={styles.formError}>
									<Text style={styles.formErrorText}>
										Wrong address email.
									</Text>
								</View>
							)}
							{displaySuccess && (
								<View style={styles.formSuccess}>
									<Text style={styles.formSuccessText}>
										An email was sent
									</Text>
								</View>
							)}
						</View>
					</View>
					<TouchableOpacity
						onPress={() => this.props.navigation.goBack()}
						underlayColor="white"
					>
						<Text style={styles.appLink}>Go back</Text>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</LinearGradient>
		);
	}
}

export default connect()(Forget);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
		// alignItems: "center"
	},
	appContainer: {
		marginTop: 30,
		borderRadius: 10,
		backgroundColor: "#fff",
		// overflow: 'hidden',
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
	containerImage: {
		width: undefined,
		height: 160,
	},
	formContainer: {
		position: "relative",
		padding: 30,
	},
	appText: {
		fontSize: 16,
		lineHeight: 20,
		textAlign: "center",
	},
	loadingImage: {
		width: 400,
		height: 400,
	},
	appLink: {
		marginTop: 20,

		fontSize: 14,
		color: "#fff",
		textAlign: "center",
		textDecorationLine: "underline",
	},
	formError: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		paddingVertical: 8,
		backgroundColor: "#F48586",
		// borderRadiusLeftBottom: 10,
		// borderRadiusRightBottom: 10,
	},
	formErrorText: {
		textAlign: "center",
		color: "#ED3436",
		fontSize: 12,
	},
	formSuccess: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		paddingVertical: 8,
		backgroundColor: "#3FA9B4",
		// borderRadiusLeftBottom: 10,
		// borderRadiusRightBottom: 10,
	},
	formSuccessText: {
		textAlign: "center",
		color: "#FFF",
		fontSize: 12,
	},
});
