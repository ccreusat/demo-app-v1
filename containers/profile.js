import React, { Component } from "react";
import _ from "lodash";
import {
	FlatList,
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import ProfileEmpty from "containers/profile-empty";
import RedoQuizz from "containers/redo-quizz";
import WineDetail from "containers/wine-detail";

import AppLoader from "../components/loading";
import WineItem from "../components/wine-item";

import getColorForProfile from "utils/getColorForProfile";
import getImageForLabel from "utils/getImageForLabel";

import { connect } from "react-redux";
import { getProfile, getReco } from "../actions/profileActions";
import { getProductInfo, closeModal } from "../actions/productActions";

class Profile extends Component {
	static navigationOptions = { title: "Mes infos" };

	state = {
		userToken: "",
	};

	componentDidMount = async () => {
		let userToken = await AsyncStorage.getItem("userToken");

		this.setState({ userToken });

		this.props.onLoad(userToken);
	};

	_keyExtractor = item => item.id;

	_renderItem = ({ item }) => {
		const { userToken } = this.state;

		return (
			<WineItem
				index={item.index}
				image={item.image}
				label={item.label}
				name={item.name}
				aop={item.appellation}
				price={item.price}
				subprice={item.subscriber_price}
				domain={item.domain}
				color={getColorForProfile(item.color)}
				action={() => this.props.getProduct(userToken, item.id)}
			/>
		);
	};

	render() {
		const { userToken } = this.state;

		const {
			profile,
			color,
			recoWines,
			recoVisible,
			isLoaderVisible,
			wineInfo,
			isModalVisible,
		} = this.props;

		if (profile) {
			return (
				<ScrollView style={styles.container}>
					<View style={{ flex: 1 }}>
						<View style={{ padding: 40, backgroundColor: "#FFF" }}>
							<Text style={styles.profileTitle}>
								Votre label de prédilection est {profile.label}{" "}
								!
							</Text>
							<Text style={styles.profileText}>
								Votre profil vin s'affine avec le temps, au fur
								et à mesure de vos notations et de vos achats.
								Votre label de prédilection peut donc changer !
							</Text>
							<Image
								source={getImageForLabel(color)}
								style={styles.profileWheel}
								resizeMode="contain"
							/>
						</View>

						<RedoQuizz />

						<View
							style={{
								backgroundColor: getColorForProfile(color),
							}}
						>
							<View style={[styles.profileLabelContent]}>
								<View style={styles.profileLabelTop}>
									<Text
										style={[
											styles.profileTopText,
											{
												color: getColorForProfile(
													color
												),
											},
										]}
									>
										Votre top label
									</Text>
								</View>
								<Text style={styles.profileLabelTitle}>
									{profile.title}
								</Text>
								<Text style={styles.profileLabelText}>
									{profile.text}
								</Text>
							</View>

							<View
								style={{
									backgroundColor:
										"rgba(255, 255, 255, 0.50)",
									padding: 30,
								}}
							>
								<View>
									<Text style={styles.profileName}>
										Force
									</Text>
									<View
										style={[
											styles.profileStrength,
											{
												backgroundColor:
													"rgba(255,255,255,0.3)",
											},
										]}
									>
										<View
											style={{
												width:
													(profile.force * 100) / 5 +
													"%",
												height: 10,
												backgroundColor:
													getColorForProfile(color),
											}}
										></View>
									</View>
								</View>
								<View style={{ marginTop: 20 }}>
									<Text style={styles.profileName}>
										Goûts
									</Text>
									<Text
										style={[
											styles.profileDesc,
											{
												backgroundColor:
													getColorForProfile(color),
											},
										]}
									>
										#{profile.tags}
									</Text>
								</View>
								<View style={{ marginTop: 20 }}>
									<Text style={styles.profileName}>
										Vins les plus connus
									</Text>
									<View style={styles.profileRow}>
										{_.values(profile.aop).map(
											(appelation, index) => {
												return (
													<Text
														key={index}
														style={[
															styles.profileDesc,
															{
																backgroundColor:
																	getColorForProfile(
																		color
																	),
															},
														]}
													>
														{appelation}
													</Text>
												);
											}
										)}
									</View>
								</View>
								<View style={{ marginTop: 20 }}>
									<Text style={styles.profileName}>
										Régions emblématiques
									</Text>
									<View style={styles.profileRow}>
										{_.values(profile.regions).map(
											(region, index) => {
												return (
													<Text
														key={index}
														style={[
															styles.profileDesc,
															{
																backgroundColor:
																	getColorForProfile(
																		color
																	),
															},
														]}
													>
														{region}
													</Text>
												);
											}
										)}
									</View>
								</View>
							</View>
						</View>

						<View
							style={{ backgroundColor: "#ECEFF1", padding: 30 }}
						>
							<View>
								<Text
									style={{
										fontSize: 12,

										lineHeight: 18,
									}}
								>
									Au restaurant dites :
								</Text>
								<Text
									style={{
										fontSize: 12,
									}}
								>
									{profile.restaurant}
								</Text>
							</View>
							<View style={{ marginTop: 20 }}>
								<Text
									style={{
										fontSize: 12,

										lineHeight: 18,
									}}
								>
									Au supermarché nous vous conseillons :
								</Text>
								<Text
									style={{
										fontSize: 12,
									}}
								>
									{profile.market}
								</Text>
							</View>
							<View style={{ marginTop: 20 }}>
								<Text
									style={{
										fontSize: 12,

										lineHeight: 18,
									}}
								>
									Sur notre site :
								</Text>
							</View>
						</View>

						{recoVisible && (
							<View style={{ backgroundColor: "#FFF" }}>
								<View
									style={{
										paddingVertical: 30,
										paddingHorizontal: 50,
										borderBottomWidth: 1,
										borderBottomColor: "#CFD8DC",
									}}
								>
									<Text
										style={{
											textAlign: "center",
											fontSize: 22,

											lineHeight: 28,
										}}
									>
										Les vins recommandés pour vous
									</Text>
								</View>
								<FlatList
									data={recoWines}
									keyExtractor={item => item.name}
									renderItem={this._renderItem}
								/>
							</View>
						)}
					</View>
					<AppLoader isVisible={isLoaderVisible} />
					{/* <WineDetail
                        data={wineInfo}
                        token={userToken}
                        isVisible={isModalVisible}
                        close={this.props.closeModal}
                    /> */}
				</ScrollView>
			);
		}

		return (
			<View style={{ flex: 1 }}>
				<AppLoader isVisible={isLoaderVisible} />
				<ProfileEmpty />
			</View>
		);
	}
}

const mapStateToProps = state => ({
	profile: state.profile.profile,
	color: state.profile.color,
	isLoaderVisible: state.profile.isLoaderVisible,
	recoWines: state.profile.recoWines,
	recoVisible: state.profile.recoVisible,
	wineInfo: state.product.wineInfo,
	isModalVisible: state.product.isModalVisible,
});

const mapDispatchToProps = dispatch => ({
	onLoad: token => {
		dispatch(getProfile(token)), dispatch(getReco(token));
	},
	getProduct: (token, product_id) => {
		dispatch(getProductInfo(token, product_id));
	},
	closeModal: () => {
		dispatch(closeModal());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ECEFF1",
	},
	profileTitle: {
		fontSize: 17,

		lineHeight: 24,
		textAlign: "center",
	},
	profileText: {
		marginTop: 20,
		marginBottom: 20,
		fontSize: 14,

		lineHeight: 20,
		textAlign: "center",
	},
	profileWheel: {
		width: undefined,
		height: 320,
	},
	profileLabelContent: {
		padding: 30,
		alignItems: "center",
	},
	profileLabelTop: {
		backgroundColor: "#FFF",
		paddingVertical: 6,
		paddingHorizontal: 14,
		borderRadius: 14,
	},
	profileTopText: {
		textAlign: "center",
		fontSize: 12,
	},
	profileLabelText: {
		fontSize: 12,

		lineHeight: 18,
		textAlign: "center",
		color: "#FFF",
	},
	profileLabelTitle: {
		marginVertical: 15,
		color: "#FFF",
		textAlign: "center",
		fontSize: 22,
	},
	profileRow: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	profileStrength: {
		height: 10,
		...Platform.select({
			ios: {
				shadowColor: "rgba(0,0,0,0.2)",
				shadowOffset: { height: -1, width: 0 },
				shadowOpacity: 2,
				shadowRadius: 0,
			},
			android: {
				elevation: 1,
			},
		}),
	},
	profileName: {
		marginBottom: 10,
		fontSize: 14,

		lineHeight: 18,
	},
	profileDesc: {
		marginRight: 5,
		marginBottom: 5,
		padding: 5,
		alignSelf: "flex-start",
		fontSize: 12,

		color: "#FFF",
	},
});
