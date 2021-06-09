import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { withNavigation } from "react-navigation";

class SignOut extends React.Component {
	_signOutAsync = async () => {
		await AsyncStorage.removeItem("userToken");
		this.props.navigation.navigate("Auth");
	};

	render() {
		return (
			<View style={styles.signOutContainer}>
				<TouchableOpacity
					onPress={() => this._signOutAsync()}
					style={styles.signOut}
				>
					<Text style={styles.signOutText}>Logout</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default withNavigation(SignOut);

const styles = StyleSheet.create({
	signOutContainer: {
		paddingVertical: 30,
		paddingHorizontal: 25,
	},
	signOut: {
		padding: 16,
		width: "100%",
		borderWidth: 1,
		borderColor: "#37474F",
	},
	signOutText: {
		color: "#37474F",

		fontSize: 16,
		// lineHeight: 54,
		textAlign: "center",
	},
});
