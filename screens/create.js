import React, { Component } from "react";
import _ from "lodash";
import {
	DatePickerIOS,
	DatePickerAndroid,
	Modal,
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	Platform,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

import Input from "../components/input";

import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import {
	createUser,
	openDatePickeriOS,
	closeDatePickeriOS,
} from "../actions/createActions";

class CreateAccount extends Component {
	static navigationOptions = {
		title: "Register my account",
	};

	state = {
		data: {},
		email: "",
		firstname: "",
		lastname: "",
		password: "",
		set_password: "",
		confirm_password: "",
		dob: "",
		optin_extern: 1,
		optin_extern_checked: true,
		optin_legal_checked: false,
		displayError: false,
		displayErrorPassword: false,
		chosenDate: new Date(),
		formatDate: moment(new Date()).format("YYYY-MM-DD"),
	};

	componentDidMount = () => {
		let { formatDate } = this.state;

		this.setState({
			day: moment(formatDate).format("DD"),
			month: moment(formatDate).format("MM"),
			year: moment(formatDate).format("YYYY"),
		});
	};

	componentDidUpdate = prevProps => {
		if (this.props.user_token !== prevProps.user_token) {
			this._signInAsync(this.props.user_token);
		}
	};

	_openDatePickerAndroid = async () => {
		try {
			const { action, year, month, day } = await DatePickerAndroid.open({
				date: new Date(),
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				this.setState(
					{
						day: day,
						month: month,
						year: year,
					},
					() => {
						this.setState({
							formatDate: year + "-" + month + "-" + day,
						});
					}
				);
			}
		} catch ({ code, message }) {
			console.warn("Cannot open date picker", message);
		}
	};

	_setDate = newDate => {
		this.setState(
			{
				chosenDate: newDate,
				formatDate: moment(newDate).format("YYYY-MM-DD 00:00:00"),
			},
			() => {
				let { formatDate } = this.state;

				this.setState({
					day: moment(formatDate).format("DD"),
					month: moment(formatDate).format("MM"),
					year: moment(formatDate).format("YYYY"),
				});
			}
		);
	};

	_checkTextInput = () => {
		const {
			email,
			firstname,
			lastname,
			set_password,
			confirm_password,
			optin_legal_checked,
		} = this.state;

		if (
			email == "" ||
			firstname == "" ||
			lastname == "" ||
			set_password == "" ||
			confirm_password == "" ||
			optin_legal_checked == ""
		) {
			this.setState({ displayError: true });
		}
	};

	_passwordMatch = (value1, value2) => {
		const strongRegex = new RegExp(
			"(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$"
		);

		if (strongRegex.test(value1) && strongRegex.test(value2)) {
			this.setState({
				full_password: value2,
				displayErrorPassword: false,
			});
		} else {
			this.setState({
				errorPasswordText:
					"At least 1 capitalize letter, one lower, one number and minimum 8 characters.",
				displayErrorPassword: true,
			});
		}
	};

	handleSubmit = () => {
		this.setState(
			state => ({
				data: {
					email: state.email,
					firstname: state.firstname,
					lastname: state.lastname,
					password: state.full_password,
					dob: state.formatDate,
					optin_extern: state.optin_extern,
				},
				optin_legal_checked: state.optin_legal_checked,
			}),
			() => {
				const { data, optin_legal_checked } = this.state;

				if (!_.isEmpty(data) && optin_legal_checked) {
					this.props.onSubmit(data);
				} else {
					this._checkTextInput();
				}
			}
		);
	};

	_updateOptinExtern = () => {
		let checked = this.state.optin_extern_checked;

		this.setState({
			optin_extern: checked ? 0 : 1,
			optin_extern_checked: checked ? false : true,
			displayError: true ? false : true,
		});
	};

	_updateOptinLegal = () => {
		let checked = this.state.optin_legal_checked;

		this.setState({
			optin_legal_checked: checked ? false : true,
			displayError: true ? false : true,
		});
	};

	_signInAsync = async token => {
		await AsyncStorage.setItem("userToken", token);
		this.props.navigation.navigate("Main");
	};

	render() {
		const {
			firstname,
			lastname,
			email,
			day,
			month,
			year,
			set_password,
			confirm_password,
			optin_extern_checked,
			optin_legal_checked,
			displayError,
			displayErrorPassword,
		} = this.state;

		const { isPickerVisible } = this.props;

		return (
			<LinearGradient colors={["#9BD2D7", "#82C7CD"]} style={{ flex: 1 }}>
				<KeyboardAvoidingView
					keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
					style={{ flex: 1 }}
				>
					<ScrollView style={{ padding: 30 }}>
						<View
							style={
								displayError
									? [
											styles.appContainer,
											{ paddingBottom: 30 },
									  ]
									: styles.appContainer
							}
						>
							<View style={styles.formContainer}>
								<Input
									label="Firstname"
									keyboardType="email-address"
									returnKeyType="next"
									value={firstname}
									action={firstname =>
										this.setState({
											firstname,
											displayError: false,
										})
									}
									placeholder="Firstname"
									style={styles.formInput}
								/>

								<Input
									label="Lastname"
									keyboardType="email-address"
									returnKeyType="next"
									value={lastname}
									action={lastname =>
										this.setState({
											lastname,
											displayError: false,
										})
									}
									placeholder="Lastname"
									style={styles.formInput}
								/>

								<Input
									label="Email"
									capitalize="none"
									keyboardType="email-address"
									returnKeyType="next"
									value={email}
									action={email =>
										this.setState({
											email,
											displayError: false,
										})
									}
									placeholder="name@mail.com"
									style={styles.formInput}
								/>

								<View style={{ marginTop: 15 }}>
									<Text style={styles.formLabel}>
										Date of Birth
									</Text>

									{Platform.OS === "android" ? (
										<View
											style={{
												flex: 1,
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											<TouchableOpacity
												onPress={() =>
													this._openDatePickerAndroid()
												}
												style={[
													styles.formInput,
													{
														width: "30%",
														alignItems: "center",
													},
												]}
											>
												<Text
													style={{ lineHeight: 46 }}
												>
													{day}
												</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() =>
													this._openDatePickerAndroid()
												}
												style={[
													styles.formInput,
													{
														width: "30%",
														alignItems: "center",
													},
												]}
											>
												<Text
													style={{ lineHeight: 46 }}
												>
													{month}
												</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() =>
													this._openDatePickerAndroid()
												}
												style={[
													styles.formInput,
													{
														width: "30%",
														alignItems: "center",
													},
												]}
											>
												<Text
													style={{ lineHeight: 46 }}
												>
													{year}
												</Text>
											</TouchableOpacity>
										</View>
									) : (
										<View>
											<View
												style={{
													flex: 1,
													flexDirection: "row",
													justifyContent:
														"space-between",
												}}
											>
												<TouchableOpacity
													onPress={() =>
														this.props.openDatePickeriOS()
													}
													style={[
														styles.formInput,
														{
															width: "30%",
															alignItems:
																"center",
														},
													]}
												>
													<Text
														style={{
															lineHeight: 46,
														}}
													>
														{day}
													</Text>
												</TouchableOpacity>
												<TouchableOpacity
													onPress={() =>
														this.props.openDatePickeriOS()
													}
													style={[
														styles.formInput,
														{
															width: "30%",
															alignItems:
																"center",
														},
													]}
												>
													<Text
														style={{
															lineHeight: 46,
														}}
													>
														{month}
													</Text>
												</TouchableOpacity>
												<TouchableOpacity
													onPress={() =>
														this.props.openDatePickeriOS()
													}
													style={[
														styles.formInput,
														{
															width: "30%",
															alignItems:
																"center",
														},
													]}
												>
													<Text
														style={{
															lineHeight: 46,
														}}
													>
														{year}
													</Text>
												</TouchableOpacity>
											</View>
											<Modal
												animationType="fade"
												transparent={true}
												visible={isPickerVisible}
											>
												<View
													style={{
														flex: 1,
														justifyContent:
															"flex-end",
														backgroundColor:
															"rgba(0,0,0,0.6)",
													}}
												>
													<View
														style={{
															paddingVertical: 10,
															paddingHorizontal: 15,
															flexDirection:
																"row",
															justifyContent:
																"flex-end",
															backgroundColor:
																"#F9F9F9",
														}}
													>
														<TouchableOpacity
															onPress={() =>
																this.props.closeDatePickeriOS()
															}
														>
															<Text
																style={{
																	fontSize: 16,
																	color: "#007AFF",
																}}
															>
																Confirmer
															</Text>
														</TouchableOpacity>
													</View>
													<DatePickerIOS
														style={{
															backgroundColor:
																"#FFF",
														}}
														mode="date"
														date={
															this.state
																.chosenDate
														}
														onDateChange={
															this._setDate
														}
														locale="fr"
													/>
												</View>
											</Modal>
										</View>
									)}
								</View>

								<Input
									label="Password"
									keyboardType="default"
									returnKeyType="next"
									secure={true}
									value={set_password}
									action={set_password =>
										this.setState({
											set_password,
											displayError: false,
										})
									}
									placeholder="Password"
									style={styles.formInput}
								/>

								<Input
									label="Confirm Password"
									keyboardType="default"
									returnKeyType="next"
									secure={true}
									value={confirm_password}
									action={confirm_password =>
										this.setState({
											confirm_password,
											displayError: false,
										})
									}
									ending={() =>
										this._passwordMatch(
											set_password,
											confirm_password
										)
									}
									placeholder="Confirm Password"
									style={styles.formInput}
								/>

								{displayErrorPassword && (
									<Text style={styles.formErrorPassword}>
										{this.state.errorPasswordText}
									</Text>
								)}
							</View>

							<View
								style={[
									styles.formContainer,
									{ backgroundColor: "#ECEFF1" },
								]}
							>
								<TouchableOpacity
									onPress={() => this._updateOptinExtern()}
									checked={optin_extern_checked}
									style={styles.checkboxContainer}
								>
									<View style={styles.checkbox}>
										{optin_extern_checked ? (
											<Image
												source={require("../assets/icons/ic_done.png")}
												style={styles.checkboxIcon}
											/>
										) : null}
									</View>
									<Text style={styles.checkboxText}>
										Lorem ipsum
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => this._updateOptinLegal()}
									checked={optin_legal_checked}
									style={[
										styles.checkboxContainer,
										{ marginTop: 15 },
									]}
								>
									<View style={styles.checkbox}>
										{optin_legal_checked ? (
											<Image
												source={require("../assets/icons/ic_done.png")}
												style={styles.checkboxIcon}
											/>
										) : null}
									</View>
									<Text style={styles.checkboxText}>
										Lorem ipsum
									</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.ButtonContainer}>
								<TouchableOpacity
									style={[
										styles.Button,
										{ backgroundColor: "#3FA9B4" },
									]}
									onPress={() => this.handleSubmit()}
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
										Register
									</Text>
								</TouchableOpacity>
							</View>
							{displayError && (
								<View style={styles.formError}>
									<Text style={styles.formErrorText}>
										At least, one field must be complete.
									</Text>
								</View>
							)}
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		);
	}
}

const mapStateToProps = state => ({
	user_token: state.create.user_token,
	errorMessage: state.create.error,
	data: state.create.data,
	optin: state.create.optin,
	isPickerVisible: state.account.isPickerVisible,
});

const mapDispatchToProps = dispatch => ({
	onSubmit: data => {
		dispatch(createUser(data));
	},
	openDatePickeriOS: () => {
		dispatch(openDatePickeriOS());
	},
	closeDatePickeriOS: () => {
		dispatch(closeDatePickeriOS());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
	},
	formInput: {
		marginTop: 8,
		borderWidth: 1,
		borderColor: "#90A4AE",
		height: 46,
		paddingHorizontal: 10,
		fontSize: 14,
	},
	appContainer: {
		marginTop: 20,
		marginBottom: 60,
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
	formSelectedGender: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#37474F",
		height: 60,
		padding: 20,
	},
	formGender: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#90A4AE",
		height: 60,
		padding: 20,
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
	formErrorPassword: {
		paddingTop: 10,
		fontSize: 12,
		color: "#ED3436",
	},
	checkbox: {
		borderWidth: 1,
		borderColor: "#37474F",
		width: 24,
		height: 24,
		position: "relative",
	},
	checkboxIcon: {
		width: 24,
		height: 24,
		position: "absolute",
		top: -1,
		left: 0,
		right: 0,
		bottom: 0,
	},
	checkboxText: {
		marginLeft: 10,
		fontSize: 12,

		color: "#37474F",
		lineHeight: 18,
	},
	checkboxContainer: {
		flex: 1,
		height: 40,
		flexDirection: "row",
		alignItems: "center",
	},
	containerImage: {
		width: 320,
		height: 160,
	},
	formContainer: {
		padding: 30,
		flex: 1,
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
	ButtonContainer: {
		padding: 30,
	},
	Button: {
		height: 54,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	ButtonMD: {
		height: 48,
		width: "100%",
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
});
