import React, { Component } from "react";
import _ from "lodash";
import { Text, ScrollView, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../components/header";
import Button from "../components/button";
import Gazette from "../components/gazette";
import SubscriptionStatus from "../components/subscription-status";
import DeliveryStatus from "../components/delivery-status";
import WineSubscriber from "../components/wine-subscriber";
import Transition from "../components/transition";
import AppLoader from "../components/loading";

import WineDetail from "containers/wine-detail";

import { connect } from "react-redux";
import { getDashboard } from "../actions/mainActions";
import { getProductInfo, closeModal } from "../actions/productActions";

class Main extends Component {
	static navigationOptions = { header: () => <Header /> };

	state = {
		userToken: "",
		isTransitionVisible: false,
		externalLink: "",
	};

	componentDidMount = async () => {
		let userToken = await AsyncStorage.getItem("userToken");

		this.setState({ userToken: "token" });
		this.props.onLoad(userToken);
	};

	_toggleTransition = value => {
		this.setState({
			isTransitionVisible: !this.state.isTransitionVisible,
			externalLink: value,
		});
	};

	render() {
		const { userToken, isTransitionVisible, externalLink } = this.state;

		const { dashboard, isLoaderVisible, wineInfo, isModalVisible } =
			this.props;

		if (dashboard) {
			return (
				<ScrollView>
					<View style={styles.mainContainer}>
						{dashboard.gazette && <Gazette data={dashboard} />}

						<View style={{ marginTop: 20 }}>
							<Text style={styles.mainTitle}>
								Mes abonnements
							</Text>
							{_.values(dashboard.subscriptions).map(
								(sub, index) => {
									return (
										<View
											key={index}
											style={{ marginBottom: 20 }}
										>
											<SubscriptionStatus
												active={
													sub.status
														? "active"
														: "inactive"
												}
												title={sub.title}
												text={sub.subtitle}
												label={
													sub.status &&
													sub.status.title
												}
												color={
													sub.status &&
													sub.status.color
												}
											/>
											{sub.tracking && (
												<DeliveryStatus
													status={sub.tracking.title}
													colorText={
														sub.tracking.color_text
													}
													color={sub.tracking.color}
													arrow={
														sub.tracking.color ===
														"#F9D2B4"
															? "active"
															: "inactive"
													}
													action={() =>
														this._toggleTransition(
															sub.tracking.url
														)
													}
												/>
											)}
											{sub.box && (
												<View
													style={[
														styles.mainProduct,
														sub.block
															? {
																	borderBottomLeftRadius: 0,
																	borderBottomRightRadius: 0,
															  }
															: "",
													]}
												>
													{_.values(sub.box).map(
														(item, index) => {
															return (
																<WineSubscriber
																	key={index}
																	aop={
																		item.appellation
																	}
																	label={
																		item
																			.label
																			.name
																	}
																	color={
																		item
																			.label
																			.color
																	}
																	image={
																		item.image
																	}
																	action={() =>
																		this.props.getProduct(
																			userToken,
																			item.id
																		)
																	}
																	name={
																		item.name
																	}
																/>
															);
														}
													)}
												</View>
											)}
											{sub.block && (
												<View
													style={styles.mainContent}
												>
													<Text
														style={
															styles.mainHeadline
														}
													>
														{sub.block.title}
													</Text>
													<Text
														style={styles.mainText}
													>
														{sub.block.description}
													</Text>
													<Button
														size="s"
														action={() =>
															this._toggleTransition(
																sub.block.button
																	.url
															)
														}
														name={
															sub.block.button
																.label
														}
														color={
															sub.block.button
																.color
														}
														colorText="#FFF"
														top={20}
													/>
												</View>
											)}
										</View>
									);
								}
							)}
						</View>

						<Transition
							link={externalLink}
							isVisible={isTransitionVisible}
							close={() =>
								this.setState({ isTransitionVisible: false })
							}
						/>

						<AppLoader isVisible={isLoaderVisible} />

						{userToken !== null && (
							<WineDetail
								data={wineInfo}
								token={userToken}
								isVisible={isModalVisible}
								close={this.props.closeModal}
							/>
						)}
					</View>
				</ScrollView>
			);
		}

		if (!dashboard) {
			return (
				<ScrollView>
					<View style={styles.mainContainer}>
						<View style={{ marginTop: 40 }}>
							<Text style={styles.mainTitle}>
								My subscriptions
							</Text>
							<SubscriptionStatus
								active="inactive"
								title="Lorem ipsum ?"
								link="Login"
								action={() =>
									this.props.navigation.navigate("Login")
								}
							/>
							<View style={styles.mainContent}>
								<Text style={styles.mainHeadline}>
									Lorem ipsum
								</Text>
								<Text style={styles.mainText}>
									From <Text>xx,xx€/month</Text> lorem pipsum
								</Text>
								<Button
									size="s"
									name="See pricing options"
									color="#ED3436"
									colorText="#FFF"
									top={20}
								/>
							</View>
						</View>

						<AppLoader isVisible={isLoaderVisible} />
					</View>
				</ScrollView>
			);
		}
	}
}

const mapStateToProps = state => ({
	dashboard: state.main.dashboard,
	isLoaderVisible: state.main.isLoaderVisible,
	wineInfo: state.product.wineInfo,
	isModalVisible: state.product.isModalVisible,
});

const mapDispatchToProps = dispatch => ({
	onLoad: token => {
		dispatch(getDashboard(token));
	},
	getProduct: (token, product_id) => {
		dispatch(getProductInfo(token, product_id));
	},
	closeModal: () => {
		dispatch(closeModal());
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingBottom: 30,
		backgroundColor: "#FFF",
	},
	mainTitle: {
		paddingBottom: 20,
		fontSize: 20,
		textAlign: "left",

		lineHeight: 20,
	},
	mainContent: {
		padding: 30,
		backgroundColor: "#ECEFF1",
		borderWidth: 1,
		borderTopWidth: 0,
		borderColor: "#CFD8DC",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
	},
	mainHeadline: {
		textAlign: "center",
		fontSize: 14,
		lineHeight: 18,
	},
	mainText: {
		marginTop: 10,
		textAlign: "center",
		fontSize: 12,
		lineHeight: 16,
	},
	mainProduct: {
		backgroundColor: "#ECEFF1",
		borderWidth: 1,
		borderTopWidth: 0,
		borderColor: "#CFD8DC",
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		paddingHorizontal: 10,
		paddingBottom: 10,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
});
