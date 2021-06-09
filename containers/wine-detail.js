import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import {
	Dimensions,
	Image,
	Modal,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
// import Swiper from 'react-native-swiper';

import { AirbnbRating } from "react-native-ratings";

import getColorForProfile from "utils/getColorForProfile";

import Transition from "components/transition";
import Button from "components/button";
import WinePrices from "components/wine-prices";

import { RATING_API } from "@env";

export default class WineDetail extends Component {
	state = {
		userToken: "",
		data: {},
		product_id: "",
		isRatingVisible: false,
		isTransitionVisible: false,
		score: "",
		externalLink: "",
		userRated: false,
		// paginationPosition: 30
	};

	_setUpScore = () => {
		let data = this.props.data;
		let user_rating = data.user_rating;

		if (user_rating > 0) {
			this.setState({
				score: data && user_rating ? user_rating : "",
				userRated: true,
			});
		}
	};

	_ratingModal = () => {
		this.setState({
			isRatingVisible: !this.state.isRatingVisible,
		});
	};

	_toggleTransition = value => {
		this.setState({
			isTransitionVisible: !this.state.isTransitionVisible,
			externalLink: value,
		});
	};

	_wineReview = () => {
		const token = this.props.token;
		let product_id = this.props.data.id;

		this.setState(
			{
				data: {
					user_token: token,
					product_id: product_id,
					score: this.state.score,
				},
			},
			() => {
				axios({
					method: "post",
					url: `${RATING_API}/${token}`,
					data: this.state.data,
					headers: {
						Authorization: "token-from-auth-api",
						"Content-Type": "application/json",
						TOKEN: "MyTestToken",
					},
				})
					.then(response => {
						this._ratingModal();
						this.setState({ userRated: true });
					})
					.catch(error => {
						console.log(error);
					});
			}
		);
	};

	render() {
		const { data, isVisible, close, token } = this.props;
		const {
			isRatingVisible,
			externalLink,
			isTransitionVisible,
			score,
			userRated,
		} = this.state;

		return (
			<Modal
				transparent={false}
				style={styles.modalContainer}
				animationType="slide"
				visible={isVisible}
				onRequestClose={close}
				onShow={() => this._setUpScore()}
			>
				{data && (
					<View style={styles.modalContent}>
						<ScrollView style={styles.modalCard}>
							<View style={{ paddingTop: 30, paddingBottom: 30 }}>
								<View style={styles.modalInner}>
									<TouchableOpacity
										style={styles.modalClose}
										onPress={close}
									>
										<Image
											style={styles.modalCloseImage}
											source={require("assets/icons/baseline_close_black.png")}
										/>
									</TouchableOpacity>
									<View style={{ flexDirection: "row" }}>
										<View style={{ width: "60%" }}>
											<Text style={styles.productName}>
												{data.name}
											</Text>
											<Text style={styles.productDomain}>
												{data.domain}
											</Text>
											<Text style={styles.productAOP}>
												{data.appellation}
											</Text>
											<Text style={styles.productFont12}>
												<Text>Service:</Text>{" "}
												{data.service}
											</Text>
											<Text style={styles.productFont12}>
												<Text>Carafage:</Text>{" "}
												{data.decanting}
											</Text>
											<Text style={styles.productFont12}>
												<Text>A déguster avant:</Text>{" "}
												{data.keeping}
											</Text>
											<Text
												style={
													styles.productDescription
												}
											>
												{data.dashboard_description}
											</Text>
										</View>
										<Image
											source={{ uri: data.image }}
											style={styles.productImage}
										/>
									</View>

									<Text style={styles.productHeadline}>
										Côté fourchette
									</Text>
									{data.agreement_perfect !== "" && (
										<View style={styles.detailRow}>
											<Image
												source={require("assets/icons/ic-fork.png")}
												style={{
													width: 20,
													height: 20,
												}}
											/>
											<View
												style={{
													marginLeft: 10,
													paddingRight: 20,
												}}
											>
												<Text
													style={styles.detailTitle}
												>
													Accord parfait
												</Text>
												<Text
													style={{
														fontSize: RFValue(2),
													}}
												>
													{data.agreement_perfect}
												</Text>
											</View>
										</View>
									)}
									{data.agreement_meat !== "" && (
										<View style={styles.detailRow}>
											<Image
												source={require("assets/icons/ic-meat.png")}
												style={{
													width: 20,
													height: 20,
												}}
											/>
											<View
												style={{
													marginLeft: 10,
													paddingRight: 20,
												}}
											>
												<Text
													style={styles.detailTitle}
												>
													Viandes
												</Text>
												<Text
													style={{
														fontSize: RFValue(2),
													}}
												>
													{data.agreement_meat}
												</Text>
											</View>
										</View>
									)}
									{data.agreement_cheese !== "" && (
										<View style={styles.detailRow}>
											<Image
												source={require("assets/icons/ic-cheese.png")}
												style={{
													width: 20,
													height: 20,
												}}
											/>
											<View
												style={{
													marginLeft: 10,
													paddingRight: 20,
												}}
											>
												<Text
													style={styles.detailTitle}
												>
													Fromage
												</Text>
												<Text
													style={{
														fontSize: RFValue(2),
													}}
												>
													{data.agreement_cheese}
												</Text>
											</View>
										</View>
									)}
									{data.agreement_fish !== "" && (
										<View style={styles.detailRow}>
											<Image
												source={require("assets/icons/ic-fish.png")}
												style={{
													width: 20,
													height: 20,
												}}
											/>
											<View
												style={{
													marginLeft: 10,
													paddingRight: 20,
												}}
											>
												<Text
													style={styles.detailTitle}
												>
													Poissons
												</Text>
												<Text
													style={{
														fontSize: RFValue(2),
													}}
												>
													{data.agreement_fish}
												</Text>
											</View>
										</View>
									)}
									{data.agreement_vegetables !== "" && (
										<View style={styles.detailRow}>
											<Image
												source={require("assets/icons/ic-vegetable.png")}
												style={{
													width: 20,
													height: 20,
												}}
											/>
											<View
												style={{
													marginLeft: 10,
													paddingRight: 20,
												}}
											>
												<Text
													style={styles.detailTitle}
												>
													Légumes
												</Text>
												<Text
													style={{
														fontSize: RFValue(2),
													}}
												>
													{data.agreement_vegetables}
												</Text>
											</View>
										</View>
									)}
									{data.agreement_dessert !== "" && (
										<View style={styles.detailRow}>
											<Image
												source={require("assets/icons/ic-dessert.png")}
												style={{
													width: 20,
													height: 20,
												}}
											/>
											<View
												style={{
													marginLeft: 10,
													paddingRight: 20,
												}}
											>
												<Text
													style={styles.detailTitle}
												>
													Desserts
												</Text>
												<Text
													style={{
														fontSize: RFValue(2),
													}}
												>
													{data.agreement_dessert}
												</Text>
											</View>
										</View>
									)}
									<Text
										style={[
											styles.productHeadline,
											{ marginTop: 10 },
										]}
									>
										Dégustation
									</Text>
									{data.what_occasion !== "" && (
										<View
											style={{
												marginBottom: 16,
												flexDirection: "row",
											}}
										>
											<Image
												source={require("assets/icons/ic-glass.png")}
												style={{
													width: 20,
													height: 20,
												}}
											/>
											<View
												style={{
													marginLeft: 10,
													paddingRight: 20,
												}}
											>
												<Text
													style={{
														fontSize: RFValue(2),
													}}
												>
													{_.isArray(
														data.what_occasion
													) ? (
														_.values(
															data.what_occasion
														).map((o, index) => {
															return (
																<Text
																	key={index}
																	style={{
																		fontSize:
																			RFValue(
																				2
																			),
																	}}
																>
																	{index
																		? ", " +
																		  o
																		: o}
																</Text>
															);
														})
													) : (
														<Text
															style={{
																fontSize:
																	RFValue(2),
															}}
														>
															{data.what_occasion}
														</Text>
													)}
												</Text>
											</View>
										</View>
									)}
									{data.tasting_eye_text !== "" && (
										<View
											style={{
												marginBottom: 16,
												flexDirection: "row",
											}}
										>
											<Image
												source={require("assets/icons/ic-eye.png")}
												style={{
													width: 20,
													height: 20,
												}}
											/>
											<View
												style={{
													marginLeft: 10,
													paddingRight: 20,
												}}
											>
												<Text
													style={{
														fontSize: RFValue(2),
													}}
												>
													{data.tasting_eye_text}
												</Text>
											</View>
										</View>
									)}
									{data.tasting_nose_text !== "" && (
										<View
											style={{
												marginBottom: 16,
												flexDirection: "row",
											}}
										>
											<Image
												source={require("assets/icons/ic-nose.png")}
												style={{
													width: 20,
													height: 20,
												}}
											/>
											<View
												style={{
													marginLeft: 10,
													paddingRight: 20,
												}}
											>
												<Text
													style={{
														fontSize: RFValue(2),
													}}
												>
													{data.tasting_nose_text}
												</Text>
											</View>
										</View>
									)}
									{data.tasting_mouth_text !== "" && (
										<View
											style={{
												marginBottom: 16,
												flexDirection: "row",
											}}
										>
											<Image
												source={require("assets/icons/ic-mouth.png")}
												style={{
													width: 20,
													height: 20,
												}}
											/>
											<View
												style={{
													marginLeft: 10,
													paddingRight: 20,
												}}
											>
												<Text
													style={{
														fontSize: RFValue(2),
													}}
												>
													{data.tasting_mouth_text}
												</Text>
											</View>
										</View>
									)}
									<View
										style={{
											marginTop: 18,
											flexDirection: "row",
											justifyContent: "space-between",
										}}
									>
										<View style={styles.progressBlock}>
											<View
												style={
													styles.progressBackground
												}
											>
												<View
													style={[
														styles.progressBar,
														{
															height:
																(100 / 5) *
																	data.tasting_summary_carac_2 +
																"%",
														},
													]}
												></View>
											</View>
											<Text style={styles.progressText}>
												Puissant
											</Text>
										</View>
										<View style={styles.progressBlock}>
											<View
												style={
													styles.progressBackground
												}
											>
												<View
													style={[
														styles.progressBar,
														{
															height:
																(data.tasting_summary_carac_3 *
																	100) /
																	5 +
																"%",
														},
													]}
												></View>
											</View>
											<Text style={styles.progressText}>
												Complexe
											</Text>
										</View>
										<View style={styles.progressBlock}>
											<View
												style={
													styles.progressBackground
												}
											>
												<View
													style={[
														styles.progressBar,
														{
															height:
																(data.tasting_summary_carac_4 *
																	100) /
																	5 +
																"%",
														},
													]}
												></View>
											</View>
											<Text style={styles.progressText}>
												Epicé
											</Text>
										</View>
										<View style={styles.progressBlock}>
											<View
												style={
													styles.progressBackground
												}
											>
												<View
													style={[
														styles.progressBar,
														{
															height:
																(data.tasting_summary_carac_5 *
																	100) /
																	5 +
																"%",
														},
													]}
												></View>
											</View>
											<Text style={styles.progressText}>
												Fruité
											</Text>
										</View>
										<View style={styles.progressBlock}>
											<View
												style={
													styles.progressBackground
												}
											>
												<View
													style={[
														styles.progressBar,
														{
															height:
																(data.tasting_summary_carac_6 *
																	100) /
																	5 +
																"%",
														},
													]}
												></View>
											</View>
											<Text style={styles.progressText}>
												Boisé
											</Text>
										</View>
										<View style={styles.progressBlock}>
											<View
												style={
													styles.progressBackground
												}
											>
												<View
													style={[
														styles.progressBar,
														{
															height:
																(data.tasting_summary_carac_7 *
																	100) /
																	5 +
																"%",
														},
													]}
												></View>
											</View>
											<Text style={styles.progressText}>
												Tannique
											</Text>
										</View>
									</View>

									<View
										style={[
											styles.productRatingRow,
											{
												justifyContent: token
													? "space-between"
													: "flex-end",
											},
										]}
									>
										{token && (
											<View>
												{userRated ? (
													<TouchableOpacity
														onPress={() =>
															this._ratingModal()
														}
													>
														<AirbnbRating
															selectedColor="#02A0AE"
															isDisabled
															defaultRating={
																score
															}
															count={5}
															showRating={false}
															size={20}
														/>
														<Text
															style={{
																fontSize:
																	RFValue(2),
																color: "#90A4AE",
																textAlign:
																	"center",
																textDecorationLine:
																	"underline",
															}}
														>
															Changer ma note
														</Text>
													</TouchableOpacity>
												) : (
													<TouchableOpacity
														style={{
															paddingTop: 10,
															paddingBottom: 12,
															paddingHorizontal: 10,
															backgroundColor:
																"#ED3436",
														}}
														onPress={() =>
															this._ratingModal()
														}
													>
														<Text
															style={{
																color: "#fff",
																fontSize: 14,
																textAlign:
																	"center",
															}}
														>
															Noter ce vin
														</Text>
													</TouchableOpacity>
												)}
											</View>
										)}
										<View>
											{data.rating !== "" && (
												<Text
													style={
														styles.productRatingRate
													}
												>
													{data.rating}
													<Text
														style={
															styles.productRatingScale
														}
													>
														/5
													</Text>
												</Text>
											)}
											{data.reviews_count !== "" && (
												<Text
													style={
														styles.productRatingText
													}
												>
													({data.reviews_count} notes)
												</Text>
											)}
										</View>
									</View>

									<TouchableOpacity
										onPress={() =>
											this._toggleTransition(
												data.url_path
											)
										}
										style={styles.productButton}
									>
										<Text style={styles.productButtonText}>
											Acheter sur le e-shop
										</Text>
									</TouchableOpacity>
									{data.prices && (
										<WinePrices
											info={data.prices}
											type={data.prices.type}
										/>
									)}
									<View
										style={[
											styles.productLabel,
											{
												backgroundColor:
													getColorForProfile(
														data.label_code
													),
											},
										]}
									>
										<Text style={styles.productLabelText}>
											{data.label}
										</Text>
									</View>
								</View>
							</View>
						</ScrollView>
						<Modal
							animationType="fade"
							transparent={true}
							visible={isRatingVisible}
						>
							<View
								style={{
									flex: 1,
									justifyContent: "flex-end",
									backgroundColor: "rgba(0,0,0,0.6)",
								}}
							>
								<View
									style={{
										padding: 25,
										justifyContent: "flex-end",
										backgroundColor: "#F9F9F9",
									}}
								>
									<Text
										style={{
											textAlign: "center",
											fontSize: RFValue(2),
											color: "#37474F",

											marginBottom: 20,
										}}
									>
										Avez-vous aimé ce vin ?
									</Text>
									<AirbnbRating
										selectedColor="#02A0AE"
										defaultRating={1}
										count={5}
										showRating={false}
										size={40}
										onFinishRating={rating =>
											this.setState({ score: rating })
										}
									/>
									<Button
										name="C'est mon dernier mot !"
										color="#ED3436"
										colorText="#FFF"
										top={30}
										action={() => this._wineReview()}
									/>

									<TouchableOpacity
										onPress={() => this._ratingModal()}
										underlayColor="white"
									>
										<Text style={styles.cancel}>
											Annuler
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</Modal>
						<Transition
							link={externalLink}
							isVisible={isTransitionVisible}
							close={() =>
								this.setState({ isTransitionVisible: false })
							}
						/>
					</View>
				)}
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	modalContainer: {
		position: "relative",
		flex: 1,
	},
	modalBackface: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	modalContent: {
		flex: 1,
		height: "100%",
		width: "100%",
	},
	modalCard: {
		position: "relative",
		flex: 1,
		// overflow:'hidden',
		paddingHorizontal: 20,
		width: "100%",
		backgroundColor: "#9BD2D7",
	},
	modalInner: {
		position: "relative",
		backgroundColor: "#FFF",
		padding: 20,
		borderRadius: 10,
		height: "100%",
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
	productHeadline: {
		marginBottom: 20,
		marginLeft: 30,
		color: "#ED3436",
		fontSize: RFValue(2.3),
	},
	productImage: {
		width: Dimensions.get("window").height > 600 ? 130 : 86,
		height: Dimensions.get("window").height > 600 ? 312 : 208,
	},
	productDescription: {
		marginVertical: 20,
		fontSize: RFValue(2.5),
		fontStyle: "italic",
		lineHeight: 22,
	},
	productAOP: {
		marginVertical: 10,
		fontSize: RFValue(2),

		textTransform: "uppercase",
	},
	modalClose: {
		position: "absolute",
		top: 15,
		right: 0,
		width: 44,
		height: 44,
		zIndex: 100,
	},
	modalCloseImage: {
		width: 30,
		height: 30,
	},
	productName: {
		color: "#ED3436",
		fontSize: RFValue(4),
		lineHeight: 28,
	},
	productDomain: {
		fontSize: RFValue(2.5),

		lineHeight: 20,
	},
	productFont12: {
		fontSize: RFValue(2),
	},
	productRatingRow: {
		marginVertical: 20,
		flexDirection: "row",
		alignItems: "center",
		paddingRight: 20,
	},
	productRatingRate: {
		textAlign: "center",
		fontSize: 32,
		color: "#90A4AE",
	},
	productRatingText: {
		textAlign: "center",
		fontSize: RFValue(2),
		color: "#90A4AE",
	},
	productRatingScale: {
		fontSize: RFValue(3.3),
	},
	productButton: {
		marginBottom: 20,
		padding: 16,
		borderWidth: 1,
		borderColor: "#37474F",
	},
	productButtonText: {
		color: "#37474F",

		fontSize: RFValue(2.5),
		textAlign: "center",
	},
	productPrice: {
		margin: 4,
		textAlign: "center",
		fontSize: RFValue(3),
		color: "#546E7A",
	},
	productSubPrice: {
		marginTop: 4,
		textAlign: "center",
		fontSize: RFValue(3),
	},
	productTextPrice: {
		textAlign: "center",
		fontSize: RFValue(1.5),

		textTransform: "uppercase",
	},
	productPriceRow: {
		padding: 30,
		paddingTop: 0,
		paddingBottom: 15,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	productLabel: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: 6,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	productLabelText: {
		textAlign: "center",
		fontSize: RFValue(1.5),

		color: "#FFF",
	},
	producTop: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	swiperDot: {
		backgroundColor: "transparent",
		width: 16,
		height: 16,
		borderRadius: 16,
		borderWidth: 2,
		borderColor: "#FFF",
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: 3,
	},
	swiperActiveDot: {
		backgroundColor: "#FFF",
		width: 16,
		height: 16,
		borderRadius: 16,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 3,
		marginBottom: 3,
	},
	detailRow: {
		marginBottom: 10,
		flexDirection: "row",
	},
	detailTitle: {
		fontSize: RFValue(2),

		textTransform: "uppercase",
	},
	detailBlock: {
		marginTop: 18,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	progressBlock: {
		height: 90,
		flexDirection: "column",
		alignItems: "center",
	},
	progressBackground: {
		position: "relative",
		height: 60,
		width: 10,
		backgroundColor: "#CFE9EC",
	},
	progressBar: {
		backgroundColor: "#3FA9B4",
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
	},
	progressText: {
		marginTop: 10,
		color: "#3FA9B4",
		fontSize: 10,

		textTransform: "uppercase",
	},
	cancel: {
		marginTop: 20,

		fontSize: RFValue(2),
		color: "#90A4AE",
		textAlign: "center",
		textDecorationLine: "underline",
	},
});
