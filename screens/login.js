import React, { Component } from "react";
import _ from "lodash";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import Input from "../components/input";

import { loginUser } from "../actions/loginActions";
import { connect } from "react-redux";

class Login extends Component {
	static navigationOptions = { title: "Login" };

	state = {
		email: "",
		password: "",
		expoPushToken: "",
	};

	componentDidUpdate(prevProps) {
		if (this.props.isLogged !== prevProps.isLogged) {
			this.props.navigation.navigate("App");
		}
	}

	_signIn = () => {
		let { email, password } = this.state;
		console.log(email, password);

		this.props.onLogin({ email, password });
	};

	render() {
		const { email, password } = this.state;
		const { errorMessage } = this.props;

		return (
			<View style={{ flex: 1 }}>
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
									source={require("../assets/images/illustration/login.png")}
									style={styles.containerImage}
									resizeMethod="resize"
								/>
							</View>
							<View
								style={
									errorMessage
										? [
												styles.formContainer,
												{ paddingBottom: 60 },
										  ]
										: styles.formContainer
								}
							>
								<Input
									label="Email"
									capitalize="none"
									keyboardType="email-address"
									returnKeyType="done"
									value={email}
									action={email => this.setState({ email })}
									placeholder="Email"
									style={styles.formInput}
								/>

								<Input
									label="Password"
									keyboardType="default"
									returnKeyType="done"
									secure={true}
									value={password}
									action={password =>
										this.setState({ password })
									}
									placeholder="Password"
									style={styles.formInput}
								/>

								<View style={{ marginTop: 30 }}>
									<TouchableOpacity
										style={[
											styles.Button,
											{ backgroundColor: "#3FA9B4" },
										]}
										// onPress={() => this._signIn()}
										onPress={() =>
											this.props.navigation.navigate(
												"App"
											)
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

								{errorMessage && (
									<View style={styles.formError}>
										<Text style={styles.formErrorText}>
											Adresse e-mail ou mot de passe
											incorrect.
										</Text>
									</View>
								)}
							</View>
						</View>
						<TouchableOpacity
							onPress={() =>
								this.props.navigation.navigate("Forget")
							}
							underlayColor="white"
							style={{ alignItems: "center" }}
						>
							<Text style={styles.appLink}>
								Forget password ?
							</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</LinearGradient>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	userToken: state.login.userToken,
	errorMessage: state.login.error,
	isLogged: state.login.isLogged,
});

const mapDispatchToProps = dispatch => ({
	onLogin: user => {
		dispatch(loginUser(user));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 30,
	},
	appContainer: {
		borderRadius: 10,
		backgroundColor: "#fff",
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
		paddingTop: 20,
		overflow: "hidden",
	},
	formError: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		paddingVertical: 8,
		backgroundColor: "#F48586",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	formErrorText: {
		textAlign: "center",
		color: "#ED3436",
		fontSize: 12,
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
	appLink: {
		marginTop: 20,

		fontSize: 14,
		color: "#fff",
		textDecorationLine: "underline",
	},
	separator: {
		marginVertical: 20,
		height: 1,
		backgroundColor: "#CFD8DC",
	},
});
