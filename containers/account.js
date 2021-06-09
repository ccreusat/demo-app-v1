import React, { Component } from "react";
import _ from "lodash";
import {
	DatePickerIOS,
	DatePickerAndroid,
	StyleSheet,
	Modal,
	View,
	Text,
	Image,
	Platform,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LinearGradient } from "expo-linear-gradient";

import md5 from "md5";
import moment from "moment";

import Button from "../components/button";
import Input from "../components/input";
import Transition from "../components/transition";

import getColorForProfile from "utils/getColorForProfile";

import { connect } from "react-redux";
import {
	getUser,
	updateUser,
	openDatePickeriOS,
	closeDatePickeriOS,
} from "../actions/accountActions";

class Account extends Component {
	static navigationOptions = { title: "Customer dashboard" };

	state = {
		userToken: "",
		data: {},
		email: "",
		firstname: "",
		lastname: "",
		label: "",
		password_hash: "",
		set_password: "",
		confirm_password: "",
		full_password: "",
		dob: "",
		day: "",
		month: "",
		year: "",
		optin_intern: "",
		optin_extern: "",
		optin_intern_checked: "",
		optin_extern_checked: "",
		displayErrorPassword: false,
		isTransitionVisible: false,
		externalLink: "",
		chosenDate: new Date(),
		formatDate: "",
	};

	componentDidMount = async () => {
		let userToken = await AsyncStorage.getItem("userToken");
		this.setState({ userToken }, () => {
			this.props.onLoad(userToken);
		});
	};

	componentDidUpdate = prevProps => {
		if (this.props.firstname !== prevProps.firstname) {
			this.setState({ firstname: this.props.firstname });
		}

		if (this.props.lastname !== prevProps.lastname) {
			this.setState({ lastname: this.props.lastname });
		}

		if (this.props.email !== prevProps.email) {
			this.setState({ email: this.props.email });
		}

		if (this.props.optin_intern !== prevProps.optin_intern) {
			this.setState({ optin_intern: this.props.optin_intern });
		}

		if (this.props.optin_extern !== prevProps.optin_extern) {
			this.setState({ optin_extern: this.props.optin_extern });
		}

		if (this.props.dob !== prevProps.dob) {
			this.setState({
				dob: this.props.dob,
				day: moment(this.props.dob).format("DD"),
				month: moment(this.props.dob).format("MM"),
				year: moment(this.props.dob).format("YYYY"),
			});
		}

		if (this.props !== prevProps) {
			this.setState({
				old_password: this.props.old_password,
				password_hash: this.props.password_hash,
				label: this.props.label,
			});
		}
	};

	_updateUserInfo = () => {
		this.setState(
			state => ({
				data: {
					user_token: state.userToken,
					email: state.email,
					firstname: state.firstname,
					lastname: state.lastname,
					password_hash: state.full_password,
					dob: state.formatDate,
					optin_extern: state.optin_extern,
					optin_intern: state.optin_intern,
				},
			}),
			() => {
				const { data } = this.state;
				this.props.onSubmit(data);
			}
		);
	};

	_openDatePickerAndroid = async () => {
		try {
			const { action, year, month, day } = await DatePickerAndroid.open({
				date: new Date(),
			});
			if (action !== DatePickerAndroid.dismissedAction) {
				let date = new Date(year, month, day);

				this.setState(
					{
						day: day,
						month: month,
						year: year,
					},
					() => {
						this.setState({
							formatDate: moment(date).format(
								"YYYY-MM-DD 00:00:00"
							),
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

	_passwordMatch = (value1, value2) => {
		const strongRegex = new RegExp(
			"(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$"
		);

		if (strongRegex.test(value1) && strongRegex.test(value2)) {
			this.setState({
				full_password: md5(value2),
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

	_updateOptinExtern = () => {
		let checked = this.state.optin_extern_checked;

		this.setState({
			optin_extern: checked ? 0 : 1,
			optin_extern_checked: checked ? false : true,
		});
	};

	_updateOptinIntern = () => {
		let checked = this.state.optin_intern_checked;

		this.setState({
			optin_intern: checked ? 0 : 1,
			optin_intern_checked: checked ? false : true,
		});
	};

	_toggleTransition = value => {
		this.setState({
			isTransitionVisible: !this.state.isTransitionVisible,
			externalLink: value,
		});
	};

	render() {
		const {
			firstname,
			label,
			lastname,
			email,
			day,
			month,
			year,
			old_password,
			set_password,
			confirm_password,
			optin_extern,
			optin_intern,
			displayErrorPassword,
			isTransitionVisible,
			externalLink,
		} = this.state;

		const { isPickerVisible } = this.props;

		return (
			<LinearGradient colors={["#9BD2D7", "#82C7CD"]} style={{ flex: 1 }}>
				<KeyboardAvoidingView
					behavior={Platform.OS === "ios" ? "position" : null}
					keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
					style={{ flex: 1 }}
				>
					<ScrollView style={{ padding: 30 }}>
						<View
							style={
								this.props.error || this.props.success
									? [
											styles.appContainer,
											{ paddingBottom: 30 },
									  ]
									: styles.appContainer
							}
						>
							<View style={styles.accountContent}>
								<View
									style={[
										styles.accountProfile,
										label
											? {
													backgroundColor:
														getColorForProfile(
															label
														),
											  }
											: "",
									]}
								>
									<Text style={styles.accountProfileText}>
										{firstname &&
											firstname.charAt(0).toUpperCase()}
										{lastname &&
											lastname.charAt(0).toUpperCase()}
									</Text>
								</View>
								<Text style={styles.accountUser}>
									{firstname && firstname}{" "}
									{lastname && lastname}
								</Text>
							</View>

							<View
								style={{
									marginHorizontal: 20,
									height: 1,
									backgroundColor: "#CFD8DC",
								}}
							></View>

							<View style={styles.formContainer}>
								<Input
									label="Firstname"
									keyboardType="email-address"
									returnKeyType="next"
									value={firstname}
									action={firstname =>
										this.setState({ firstname })
									}
									placeholder="Firstname"
								/>

								<Input
									label="Lastname"
									keyboardType="email-address"
									returnKeyType="next"
									value={lastname}
									action={lastname =>
										this.setState({ lastname })
									}
									placeholder="Lastname"
								/>

								<Input
									label="Email"
									keyboardType="email-address"
									returnKeyType="done"
									value={email}
									action={email => this.setState({ email })}
									placeholder="test@mail.com"
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
									label="Old Password"
									keyboardType="default"
									returnKeyType="done"
									secure={true}
									value={old_password}
									action={old_password =>
										this.setState({ old_password })
									}
									placeholder="Old Password"
								/>

								<Input
									label="Password"
									keyboardType="default"
									returnKeyType="done"
									secure={true}
									value={set_password}
									action={set_password =>
										this.setState({ set_password })
									}
									placeholder="Password"
								/>

								<Input
									label="Confirm new Password"
									keyboardType="default"
									returnKeyType="done"
									secure={true}
									value={confirm_password}
									action={confirm_password =>
										this.setState({ confirm_password })
									}
									ending={() =>
										this._passwordMatch(
											set_password,
											confirm_password
										)
									}
									placeholder="Confirm new Password"
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
									style={styles.checkboxContainer}
								>
									<View style={styles.checkbox}>
										{optin_extern == 1 ? (
											<Image
												source={require("assets/icons/ic_done.png")}
												style={styles.checkboxIcon}
											/>
										) : null}
									</View>
									<Text style={styles.checkboxText}>
										Lorem ipsum
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => this._updateOptinIntern()}
									style={[
										styles.checkboxContainer,
										{ marginTop: 15 },
									]}
								>
									<View style={styles.checkbox}>
										{optin_intern == 1 ? (
											<Image
												source={require("assets/icons/ic_done.png")}
												style={styles.checkboxIcon}
											/>
										) : null}
									</View>
									<Text style={styles.checkboxText}>
										Lorem ipsum
									</Text>
								</TouchableOpacity>
								<Button
									action={() => this._updateUserInfo()}
									color="#ED3436"
									colorText="#FFF"
									name="Save"
									top={20}
								/>
							</View>

							{this.props.success && (
								<View style={styles.formSuccess}>
									<Text style={styles.formSuccessText}>
										Changes saved!
									</Text>
								</View>
							)}
							{this.props.error && (
								<View style={styles.formError}>
									<Text style={styles.formErrorText}>
										Please, verify your informations
									</Text>
								</View>
							)}

							<View style={styles.ButtonContainer}>
								<TouchableOpacity
									onPress={() => this._toggleTransition("")}
									style={[
										styles.Button,
										{ backgroundColor: "#3FA9B4" },
									]}
								>
									<Text style={styles.ButtonText}>
										Subscriptions' settings
									</Text>
								</TouchableOpacity>
							</View>

							<Transition
								link={externalLink}
								isVisible={isTransitionVisible}
								close={() =>
									this.setState({
										isTransitionVisible: false,
									})
								}
							/>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</LinearGradient>
		);
	}
}

const mapStateToProps = state => ({
	success: state.account.success,
	error: state.account.error,
	firstname: state.account.firstname,
	lastname: state.account.lastname,
	old_password: state.account.old_password,
	password_hash: state.account.password_hash,
	email: state.account.email,
	dob: state.account.dob,
	optin_intern: state.account.optin_intern,
	optin_extern: state.account.optin_extern,
	label: state.account.label,
	isPickerVisible: state.account.isPickerVisible,
});

const mapDispatchToProps = dispatch => ({
	onLoad: token => {
		dispatch(getUser(token));
	},
	onSubmit: data => {
		dispatch(updateUser(data));
	},
	openDatePickeriOS: () => {
		dispatch(openDatePickeriOS());
	},
	closeDatePickeriOS: () => {
		dispatch(closeDatePickeriOS());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 30,
		backgroundColor: "#9FD4D9",
	},
	appContainer: {
		marginTop: 20,
		marginBottom: 60,
		borderRadius: 10,
		backgroundColor: "#fff",
		overflow: "hidden",
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
	accountContent: {
		paddingHorizontal: 30,
		paddingTop: 30,
		flexDirection: "column",
		alignItems: "center",
	},
	formInput: {
		marginTop: 8,
		borderWidth: 1,
		borderColor: "#90A4AE",
		height: 46,
		paddingHorizontal: 10,
		fontSize: 14,
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
	accountProfile: {
		width: 100,
		height: 100,
		borderRadius: 100,
		backgroundColor: "#000",
	},
	accountProfileText: {
		color: "#fff",
		fontSize: 38,
		textAlign: "center",

		...Platform.select({
			ios: {
				lineHeight: 100,
			},
			android: {
				lineHeight: 100,
			},
		}),
	},
	accountUser: {
		marginTop: 20,
		marginBottom: 30,
		fontSize: 18,

		lineHeight: 22,
		textAlign: "center",
	},
});
