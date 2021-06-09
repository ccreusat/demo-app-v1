import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = ({ name, color, colorText, top, size, action }) => (
	<TouchableOpacity
		onPress={action}
		style={[
			{ backgroundColor: color, marginTop: top },
			size === "s" ? styles.ButtonSM : styles.Button,
		]}
	>
		<Text style={[styles.ButtonText, { color: colorText }]}>{name}</Text>
	</TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
	ButtonContainer: {
		padding: 30,
	},
	Button: {
		padding: 20,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	ButtonMD: {
		padding: 14,
		width: "100%",
	},
	ButtonSM: {
		paddingTop: 10,
		paddingBottom: 12,
		paddingHorizontal: 10,
	},
	ButtonIcon: {
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		width: 56,
		height: 54,
	},
	ButtonText: {
		color: "#fff",

		fontSize: 16,
		textAlign: "center",
	},
	ButtonOutline: {
		borderWidth: 1,
		borderColor: "#37474F",
	},
	ButtonOutlineText: {
		color: "#37474F",
	},
});
