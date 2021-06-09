import React, { Component } from "react";
import _ from "lodash";
import { ScrollView, StyleSheet, SectionList, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import WineEmpty from "../components/wine-empty";
import WineItem from "../components/wine-item";

import getColorForProfile from "utils/getColorForProfile";

import { connect } from "react-redux";
import { getProductInfo } from "../actions/productActions";
import { getRecentWines } from "../actions/winesActions";

class Recents extends Component {
	state = {
		userToken: "",
	};

	componentDidMount = async () => {
		let userToken = await AsyncStorage.getItem("userToken");
		this.setState({ userToken });
		this.props.onLoad(userToken);
	};

	_renderSection = ({ section }) => {
		return (
			<View style={{ backgroundColor: "#ECEFF1" }}>
				<Text
					style={{
						padding: 8,
						textAlign: "center",
						color: "#90A4AE",
						fontSize: 12,
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
				price={item.price}
				subprice={item.subscriber_price}
				domain={item.domain}
				color={getColorForProfile(item.color)}
				action={() => this.props.getProduct(userToken, item.id)}
			/>
		);
	};

	render() {
		const { recentsWines } = this.props;

		if (!_.isEmpty(recentsWines)) {
			return (
				<ScrollView style={styles.container}>
					<View style={{ flex: 1, paddingBottom: 30 }}>
						<SectionList
							sections={recentsWines}
							renderSectionHeader={this._renderSection}
							renderItem={this._renderItem}
							keyExtractor={item => item.id}
						/>
					</View>
				</ScrollView>
			);
		}

		return <WineEmpty />;
	}
}

const mapStateToProps = state => ({
	recentsWines: state.wines.recentsWines,
});

const mapDispatchToProps = dispatch => ({
	onLoad: token => {
		dispatch(getRecentWines(token));
	},
	getProduct: (token, product_id) => {
		dispatch(getProductInfo(token, product_id));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Recents);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ECEFF1",
	},
});
