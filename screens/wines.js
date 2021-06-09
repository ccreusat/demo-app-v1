import React, { Component } from "react";
import { Dimensions, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import Scan from "containers/scan";
import Purchased from "containers/purchased";
import Recents from "containers/recents";

import { screenHitCall } from "../actions/analyticsActions";

class Wines extends Component {
	static navigationOptions = { title: "Mes vins" };

	state = {
		userToken: "",
		index: 0,
		routes: [
			{
				key: "scan",
				title: "Tab 1",
			},
			{
				key: "recents",
				title: "Tab 2",
			},
			{
				key: "purchased",
				title: "Tab 3",
			},
		],
	};

	componentDidMount = async () => {
		let userToken = await AsyncStorage.getItem("userToken");
		this.setState({ userToken });

		screenHitCall("Vins");
	};

	_handleIndexChange = index => this.setState({ index });

	_renderScene = SceneMap({
		scan: Scan,
		recents: Recents,
		purchased: Purchased,
	});

	render() {
		const { userToken } = this.state;
		const { wineInfo, isModalVisible } = this.props;

		return (
			<View style={{ flex: 1 }}>
				<TabView
					navigationState={this.state}
					renderTabBar={props => (
						<TabBar
							{...props}
							activeColor="#37474F"
							inactiveColor="#37474F"
							indicatorStyle={{ backgroundColor: "#37474F" }}
							style={{ backgroundColor: "#FFF" }}
							renderLabel={({ route }) => (
								<View>
									<Text
										style={{
											fontSize: 13,
											textAlign: "center",
										}}
									>
										{route.title}
									</Text>
								</View>
							)}
						/>
					)}
					renderScene={this._renderScene}
					onIndexChange={this._handleIndexChange}
					initialLayout={{ width: Dimensions.get("window").width }}
				/>
				{/* <WineDetail
            data={wineInfo}
            token={userToken}
            isVisible={isModalVisible}
            close={this.props.closeModal}
          /> */}
			</View>
		);
	}
}

export default Wines;

// const mapStateToProps = (state) => ({
//   scanWines: state.wines.scanWines,
//   wineInfo: state.product.wineInfo,
//   isModalVisible: state.product.isModalVisible
// })

// const mapDispatchToProps = (dispatch) => ({
//   onLoad: () => {
//     dispatch(getScanWines())
//   },
//   closeModal: () => {
//     dispatch(closeModal())
//   }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Wines);
