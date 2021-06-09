import React, { Component } from "react";
import _ from "lodash";
import { View, Text, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Swiper from "react-native-swiper";

import Button from "../components/button";
import QuizzData from "utils/quizz";

import {
	quizzUpload,
	updateValue,
	updateRedWine,
	updateWhiteWine,
	updatePrice,
} from "../actions/quizzActions";
import { connect } from "react-redux";

class Quizz extends Component {
	static navigationOptions = {
		headerShown: false,
	};

	state = {
		userToken: "",
	};

	componentDidMount = async () => {
		let userToken = await AsyncStorage.getItem("userToken");
		this.setState({ userToken });
	};

	componentDidUpdate(prevProps) {
		if (this.props.resultQuizz !== prevProps.resultQuizz) {
			this.props.navigation.navigate("User");
		}
		if (this.props.selectedWhiteWine !== prevProps.selectedWhiteWine) {
			this._swiper.scrollBy(1);
		}
		if (this.props.count !== prevProps.count) {
			this._swiper.scrollBy(0 + 1);
		}
	}

	_submitQuizz = () => {
		alert("Quiz sent!");
		/* const result = this.props.result;
		this.props.onSubmit(result); */
	};

	render() {
		const { userToken } = this.state;

		return (
			<View style={{ position: "relative", flex: 1 }}>
				<View
					style={{
						flex: 1,
						position: "relative",
						height: "100%",
						width: "100%",
					}}
				>
					<Swiper
						ref={swiper => {
							this._swiper = swiper;
						}}
						scrollEnabled={false}
						showsButtons={false}
						loop={false}
						showsPagination={false}
					>
						{_.values(QuizzData.questions).map(
							(question, index) => {
								return (
									<View key={index} style={{ flex: 1 }}>
										{question.block1 ? (
											<View style={{ flex: 1 }}>
												<View
													style={{
														paddingVertical: 30,
														paddingHorizontal: 50,
														borderBottomWidth: 1,
														borderBottomColor:
															"#DCDCDC",
													}}
												>
													<View
														style={{
															alignSelf: "center",
															backgroundColor:
																"#9FD4D9",
															borderRadius: 14,
															padding: 6,
														}}
													>
														<Text
															style={{
																textAlign:
																	"center",
																color: "#FFF",
																fontSize: 12,
															}}
														>
															Question {index + 1}{" "}
															sur 8
														</Text>
													</View>
													<Text
														style={{
															marginTop: 10,
															fontSize: 16,
															textAlign: "center",
														}}
													>
														Lorem ipsum
													</Text>
													<Text
														style={{
															marginTop: 6,
															fontSize: 12,
															textAlign: "center",
														}}
													>
														Lorem ipsum Lorem ipsum
														Lorem ipsum
													</Text>
												</View>
												<View>
													<Text
														style={{
															backgroundColor:
																"#D5383E",
															paddingVertical: 23,
															paddingHorizontal: 30,
															fontSize: 14,
															color: "#FFF",
														}}
													>
														{
															question.block1[0]
																.title
														}
													</Text>
													{question.block1[0].options.map(
														o => {
															return (
																<TouchableOpacity
																	onPress={() =>
																		this.props.onRed(
																			question
																				.wine[0]
																				.id,
																			o.value
																		)
																	}
																	style={{
																		backgroundColor:
																			this
																				.props
																				.selectedRedWine ==
																			o.value
																				? "#9FD4D9"
																				: "#FFF",
																		borderBottomWidth: 1,
																		borderBottomColor:
																			"#DCDCDC",
																	}}
																>
																	<Text
																		style={{
																			paddingVertical: 16,
																			paddingHorizontal: 30,
																			fontSize: 14,
																			color:
																				this
																					.props
																					.selectedRedWine ==
																				o.value
																					? "#FFF"
																					: "#37474F",
																		}}
																	>
																		{o.name}
																	</Text>
																</TouchableOpacity>
															);
														}
													)}
												</View>
												<View>
													<Text
														style={{
															backgroundColor:
																"#DACE71",
															paddingVertical: 23,
															paddingHorizontal: 30,
															fontSize: 14,
															color: "#FFF",
														}}
													>
														{
															question.block1[1]
																.title
														}
													</Text>
													{question.block1[1].options.map(
														o => {
															return (
																<TouchableOpacity
																	onPress={() =>
																		this.props.onWhite(
																			question
																				.wine[1]
																				.id,
																			o.value
																		)
																	}
																	style={{
																		backgroundColor:
																			this
																				.props
																				.selectedWhiteWine ==
																			o.value
																				? "#9FD4D9"
																				: "#FFF",
																		borderBottomWidth: 1,
																		borderBottomColor:
																			"#DCDCDC",
																	}}
																>
																	<Text
																		style={{
																			paddingVertical: 16,
																			paddingHorizontal: 30,
																			fontSize: 14,
																			color:
																				this
																					.props
																					.selectedWhiteWine ==
																				o.value
																					? "#FFF"
																					: "#37474F",
																		}}
																	>
																		{o.name}
																	</Text>
																</TouchableOpacity>
															);
														}
													)}
												</View>
											</View>
										) : question.price ? (
											<View style={{ flex: 1 }}>
												<View
													style={{
														paddingVertical: 30,
														paddingHorizontal: 50,
														borderBottomWidth: 1,
														borderBottomColor:
															"#DCDCDC",
													}}
												>
													<View
														style={{
															alignSelf: "center",
															backgroundColor:
																"#9FD4D9",
															borderRadius: 14,
															padding: 6,
														}}
													>
														<Text
															style={{
																textAlign:
																	"center",
																color: "#FFF",
																fontSize: 12,
															}}
														>
															Question 8 sur 8
														</Text>
													</View>
													<Text
														style={{
															marginTop: 10,
															fontSize: 16,
															textAlign: "center",
														}}
													>
														Lorem ipsum
													</Text>
												</View>
												<View style={{ flex: 1 }}>
													{_.values(
														question.price
													).map(item => {
														return (
															<View>
																{item.options.map(
																	o => {
																		return (
																			<TouchableOpacity
																				onPress={() =>
																					this.props.onPrice(
																						question
																							.price[0]
																							.id,
																						o.value,
																						userToken
																					)
																				}
																				style={{
																					backgroundColor:
																						this
																							.props
																							.selectedPrice ==
																						o.value
																							? "#9FD4D9"
																							: "#FFF",
																					borderBottomWidth: 1,
																					borderBottomColor:
																						"#DCDCDC",
																				}}
																			>
																				<Text
																					style={{
																						paddingVertical: 16,
																						paddingHorizontal: 30,
																						fontSize: 14,
																						color:
																							this
																								.props
																								.selectedPrice ==
																							o.value
																								? "#FFF"
																								: "#37474F",
																					}}
																				>
																					{
																						o.name
																					}
																				</Text>
																			</TouchableOpacity>
																		);
																	}
																)}
																<View
																	style={{
																		marginHorizontal: 20,
																	}}
																>
																	<Button
																		name="Confirm"
																		color="#ED3436"
																		colorText="#FFF"
																		top={30}
																		action={() =>
																			this._submitQuizz()
																		}
																	/>
																</View>
															</View>
														);
													})}
												</View>
											</View>
										) : (
											<View style={{ flex: 1 }}>
												<View
													style={{
														paddingVertical: 30,
														paddingHorizontal: 50,
														borderBottomWidth: 1,
														borderBottomColor:
															"#DCDCDC",
													}}
												>
													<View
														style={{
															alignSelf: "center",
															backgroundColor:
																"#9FD4D9",
															borderRadius: 14,
															padding: 6,
														}}
													>
														<Text
															style={{
																textAlign:
																	"center",
																color: "#FFF",
																fontSize: 12,
															}}
														>
															Question {index + 1}{" "}
															sur 8
														</Text>
													</View>
													<Text
														style={{
															marginTop: 10,
															fontSize: 16,
															textAlign: "center",
														}}
													>
														{question.question}
													</Text>
													<Text
														style={{
															marginTop: 6,
															fontSize: 12,
															textAlign: "center",
														}}
													>
														{question.text}
													</Text>
												</View>
												<View
													style={{
														flex: 1,
														flexDirection: "row",
														flexWrap: "wrap",
													}}
												>
													{_.values(
														question.options
													).map(o => {
														return (
															<TouchableOpacity
																onPress={() =>
																	this.props.onValue(
																		question.id,
																		o.value,
																		index
																	)
																}
																style={{
																	paddingTop: 20,
																	width: "50%",
																	flexWrap:
																		"wrap",
																	alignItems:
																		"center",
																	justifyContent:
																		"flex-start",
																	backgroundColor:
																		"#FFF",
																}}
															>
																<Image
																	source={{
																		uri: o.image,
																	}}
																	style={{
																		width: 130,
																		height: 130,
																		margin: "auto",
																	}}
																/>
																<Text
																	style={{
																		fontSize: 12,
																		textAlign:
																			"center",
																		width: "90%",
																	}}
																>
																	{o.name}
																</Text>
																{o.desc && (
																	<Text
																		style={{
																			fontSize: 10,
																			textAlign:
																				"center",
																			width: "90%",
																		}}
																	>
																		{o.desc}
																	</Text>
																)}
															</TouchableOpacity>
														);
													})}
												</View>
											</View>
										)}
									</View>
								);
							}
						)}
					</Swiper>
				</View>
			</View>
		);
	}
}

const mapStateToProps = state => ({
	resultQuizz: state.quizz.resultQuizz,
	selectedRedWine: state.quizz.selectedRedWine,
	selectedWhiteWine: state.quizz.selectedWhiteWine,
	selectedItem: state.quizz.selectedItem,
	selectedPrice: state.quizz.selectedPrice,
	count: state.quizz.count,
	result: state.quizz.staticResult,
});

const mapDispatchToProps = dispatch => ({
	onSubmit: data => {
		dispatch(quizzUpload(data));
	},
	onRed: (id, value) => {
		dispatch(updateRedWine(id, value));
	},
	onWhite: (id, value) => {
		dispatch(updateWhiteWine(id, value));
	},
	onValue: (id, value) => {
		dispatch(updateValue(id, value));
	},
	onPrice: (id, value, token) => {
		dispatch(updatePrice(id, value, token));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Quizz);
