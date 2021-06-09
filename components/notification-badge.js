import React, { Component } from "react";
import { Image, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class NotificationBadge extends Component {
	state = {
		badgeNumber: "",
	};

	componentDidMount = async () => {
		const badgeNumber = await AsyncStorage.getItem("badgeNumber");
		// console.log(badgeNumber);
		this.setState({ badgeNumber });
	};

	render() {
		const { badgeNumber } = this.state;

		return (
			<View style={{ position: "relative" }}>
				<Image
					source={require("assets/icons/outline_notifications_black.png")}
					style={{ width: 30, height: 30 }}
				/>
				{badgeNumber > 0 && (
					<View
						style={{
							position: "absolute",
							bottom: 0,
							right: 0,
							width: 14,
							height: 14,
							borderRadius: 14,
							zIndex: 2,
							backgroundColor: "red",
						}}
					></View>
				)}
			</View>
		);
	}
}

NotificationBadge;
