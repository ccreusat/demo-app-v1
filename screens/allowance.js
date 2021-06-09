import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import Button from "../components/button";

export default class Allow extends Component {
	state = {
		allowanceImage: require("../assets/images/presentation/allow.png"),
		title: "L'App Le Petit Ballon vous permet de tout savoir sur les vins scannés.",
		text: "Autorisez-nous à accéder à votre appareil et à vous envoyer des notifications pour vivre l'expérience à 100% ! Ces paramétrages sont modifiables à tous moments depuis les réglages.",
	};

	render() {
		const { allowanceImage, title, text } = this.state;

		return (
			<View
				style={[
					styles.container,
					{ backgroundColor: "#2E92A0", justifyContent: "flex-end" },
				]}
			>
				<Image source={allowanceImage} style={styles.allowanceImage} />
				<View style={styles.allowanceContent}>
					<Text style={styles.allowanceTitle}>{title}</Text>
					<Text style={styles.allowanceText}>{text}</Text>
				</View>
				<Button
					color="#FFF"
					colorText="#3FA9B4"
					name="Autoriser"
					top={30}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	allowanceContent: {
		padding: 20,
	},
	allowanceTitle: {
		marginTop: 40,
		padding: 15,
		fontSize: 18,

		color: "#fff",
		textAlign: "center",
		lineHeight: 24,
	},
	allowanceText: {
		marginTop: 10,

		fontSize: 12,
		color: "#fff",
		textAlign: "center",
		lineHeight: 20,
	},
	allowanceImage: {
		width: 260,
		height: 230,
	},
});
