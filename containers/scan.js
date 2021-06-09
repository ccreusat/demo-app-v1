import React, { Component } from "react";
import _ from "lodash";
import { View, Text, StyleSheet, SectionList, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RFValue } from "react-native-responsive-fontsize";

import { withNavigationFocus } from "react-navigation";

import ScanEmpty from "containers/scan-empty";
import WineDetail from "containers/wine-detail";

import AppLoader from "components/loading";
import WineItem from "components/wine-item";

import getColorForProfile from "utils/getColorForProfile";

import { connect } from "react-redux";
import { getScanWines } from "../actions/winesActions";
import { getProductInfo, closeModal } from "../actions/productActions";
import { screenHitCall, productEvent } from "../actions/analyticsActions";

class Scan extends Component {
	static navigationOptions = {
		title: "Vins scannés",
	};

	state = {
		userToken: "",
	};

	componentDidMount = async () => {
		// await AsyncStorage.removeItem('WINES');
		let userToken = await AsyncStorage.getItem("userToken");
		this.setState({ userToken });
		this.props.onLoad();
		this.props.navigation.addListener("didFocus", async () => {
			this.props.onLoad();
		});
		screenHitCall("Scan Unlogged Screen");
	};

	_renderSection = ({ section }) => {
		return (
			<View style={{ backgroundColor: "#ECEFF1" }}>
				<Text
					style={{
						padding: 8,
						textAlign: "center",
						color: "#90A4AE",
						fontSize: RFValue(1.8),
					}}
				>
					{section.key}
				</Text>
			</View>
		);
	};

	_renderItem = ({ item }) => {
		let userToken = this.state.userToken;

		return (
			<WineItem
				image={item.image}
				label={item.label}
				name={item.name}
				aop={item.appellation}
				domain={item.domain}
				price={item.price}
				subprice={item.subscriber_price}
				color={getColorForProfile(item.label_code)}
				action={() => this.props.getProduct(userToken, item.id)}
				close={() => this._toggleModal()}
			/>
		);
	};

	render() {
		const { userToken } = this.state;
		const {
			isFocused,
			scanWines,
			isLoaderVisible,
			wineInfo,
			isModalVisible,
		} = this.props;

		if (scanWines && scanWines.length > 0) {
			return (
				<ScrollView style={styles.container}>
					<View style={{ flex: 1, paddingBottom: 30 }}>
						{isFocused && (
							<SectionList
								sections={scanWines}
								renderSectionHeader={this._renderSection}
								renderItem={this._renderItem}
								keyExtractor={item => item.added_at}
							/>
						)}
					</View>
					<AppLoader isVisible={isLoaderVisible} />
					{userToken === null && (
						<WineDetail
							data={wineInfo}
							token={userToken}
							isVisible={isModalVisible}
							close={this.props.closeModal}
						/>
					)}
				</ScrollView>
			);
		}

		return <ScanEmpty />;
	}
}

const mapStateToProps = state => ({
	scanWines: state.wines.scanWines,
	isLoaderVisible: state.wines.isLoaderVisible,
	wineInfo: state.product.wineInfo,
	isModalVisible: state.product.isModalVisible,
});

const mapDispatchToProps = dispatch => ({
	onLoad: () => {
		dispatch(getScanWines());
	},
	getProduct: (token, product_id) => {
		dispatch(getProductInfo(token, product_id));
	},
	closeModal: () => {
		dispatch(closeModal());
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withNavigationFocus(Scan));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ECEFF1",
	},
});
