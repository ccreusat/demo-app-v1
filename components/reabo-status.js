import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const ReaboStatus = ({ title, bottom }) => (
	<View
		style={
			bottom
				? [
						styles.reaboStatus,
						{
							borderBottomWidth: 1,
							borderBottomLeftRadius: 10,
							borderBottomRightRadius: 10,
						},
				  ]
				: [styles.reaboStatus]
		}
	>
		<View>
			<Text style={styles.reaboStatusTitle}>{title}</Text>
		</View>
		<View>
			<TouchableOpacity style={styles.reaboStatusButton}>
				<Text style={styles.reaboStatusButtonText}>J'en profite</Text>
			</TouchableOpacity>
		</View>
	</View>
);

export default ReaboStatus;

const styles = StyleSheet.create({
	reaboStatus: {
		padding: 20,
		borderWidth: 1,
		borderBottomWidth: 0,
		borderTopWidth: 0,
		borderColor: "#CFD8DC",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	reaboStatusTitle: {
		color: "#37474F",
		fontSize: 15,

		lineHeight: 18,
		width: 180,
	},
	reaboStatusButton: {
		padding: 10,
		alignItems: "center",
		backgroundColor: "#ED3436",
	},
	reaboStatusButtonText: {
		textAlign: "right",
		color: "#FFF",
		fontSize: 14,
	},
});
