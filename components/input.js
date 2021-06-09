import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

const Input = props => (
	<View style={styles.formRow}>
		<Text style={styles.formLabel}>{props.label}</Text>
		<TextInput
			keyboardType={props.keyboardType}
			returnKeyType={props.returnKeyType}
			autoCapitalize={props.capitalize}
			value={props.value}
			onChangeText={props.action}
			onEndEditing={props.ending}
			placeholder={props.placeholder}
			secureTextEntry={props.secure}
			style={styles.formInput}
		/>
	</View>
);

export default Input;

const styles = StyleSheet.create({
	formRow: {
		marginTop: 10,
	},
	formLabel: {
		fontSize: 16,
		color: "#37474F",
	},
	formInput: {
		marginTop: 8,
		borderWidth: 1,
		borderColor: "#90A4AE",
		height: 46,
		paddingHorizontal: 10,
		fontSize: 14,
	},
});
