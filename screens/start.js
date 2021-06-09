import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppIntroSlider from "react-native-app-intro-slider";

import { LinearGradient } from "expo-linear-gradient";

import { connect } from "react-redux";

class Start extends Component {
	static navigationOptions = { headerShown: false };

	_bootstrapAsync = async () => {
		let userToken = await AsyncStorage.getItem("userToken");
		this.props.navigation.navigate(userToken ? "Main" : "Auth");
	};

	_renderItem = ({ item }) => {
		return (
			<LinearGradient
				colors={item.colors}
				style={[styles.container, { width: item.width }]}
				start={{ x: 0, y: 0.1 }}
				end={{ x: 0.1, y: 1 }}
			>
				<Image source={item.image} style={styles.slideImage} />
				<Text style={styles.slideText}>{item.text}</Text>
			</LinearGradient>
		);
	};

	render() {
		return (
			<View style={{ flex: 1, position: "relative" }}>
				<AppIntroSlider
					renderItem={this._renderItem}
					data={this.props.slides}
					bottomButton
					nextLabel="Suivant"
					doneLabel="Suivant"
					buttonStyle={{ backgroundColor: "transparent" }}
					buttonTextStyle={styles.nextButton}
					dotStyle={{
						width: 16,
						height: 16,
						backgroundColor: "transparent",
						borderWidth: 1,
						borderColor: "#FFF",
						borderRadius: 16,
					}}
					activeDotStyle={{
						width: 16,
						height: 16,
						backgroundColor: "#FFF",
						borderRadius: 16,
					}}
					onDone={this._bootstrapAsync}
				/>
			</View>
		);
	}
}

const mapStateToProps = state => {
	const { slides } = state;
	return { slides };
};

export default connect(mapStateToProps)(Start);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	slideText: {
		padding: 50,

		fontSize: 16,
		color: "#fff",
		textAlign: "center",
		lineHeight: 22,
	},
	slideImage: {
		width: 260,
		height: 230,
	},
	loadingImage: {
		width: 400,
		height: 400,
	},
	nextButton: {
		marginTop: 20,

		fontSize: 14,
		color: "#fff",
		textDecorationLine: "underline",
	},
});
