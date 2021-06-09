import React, { Component } from "react";
import _ from "lodash";
import { Dimensions, Text, View } from "react-native";

import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import Profile from "containers/profile";
import Account from "containers/account";
import Settings from "containers/settings";

export default class User extends Component {
	static navigationOptions = { title: "Customer dashboard" };

	state = {
		isReady: false,
		index: 0,
		routes: [
			{
				key: "profile",
				title: "Profile",
			},
			{
				key: "account",
				title: "Infos",
			},
			{
				key: "settings",
				title: "Settings",
			},
		],
	};

	_handleIndexChange = index => this.setState({ index });

	_renderScene = SceneMap({
		profile: Profile,
		account: Account,
		settings: Settings,
	});

	render() {
		return (
			<TabView
				navigation={this.props.navigation}
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
		);
	}
}
