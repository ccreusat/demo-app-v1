import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const SubscriptionStatus = props => (
	<View>
		{props.prospect && (
			<View
				style={[
					styles.subscriptionStatus,
					{ justifyContent: "center" },
				]}
			>
				<Text
					style={[
						styles.subscriptionStatusTitle,
						{ color: "#90A4AE" },
					]}
				>
					{props.title}
				</Text>
			</View>
		)}

		{props.active === "inactive" && (
			<TouchableOpacity
				style={[
					styles.subscriptionStatus,
					{ justifyContent: "center" },
				]}
				onPress={props.action}
			>
				<Text
					style={[
						styles.subscriptionStatusTitle,
						{ color: "#90A4AE" },
					]}
				>
					{props.title}{" "}
					<Text style={{ textDecorationLine: "underline" }}>
						{props.link}
					</Text>
				</Text>
			</TouchableOpacity>
		)}

		{props.active === "active" && (
			<View
				style={[
					styles.subscriptionStatus,
					{ justifyContent: "space-between" },
				]}
			>
				<View style={{ width: "50%" }}>
					<Text style={styles.subscriptionStatusTitle}>
						{props.title}
					</Text>
					<Text style={styles.subscriptionStatusText}>
						{props.text}
					</Text>
				</View>
				<View
					style={[
						styles.subscriptionStatusLabel,
						{ backgroundColor: props.color },
					]}
				>
					<Text style={styles.subscriptionStatusInfo}>
						{props.label}
					</Text>
				</View>
			</View>
		)}
	</View>
);

export default SubscriptionStatus;

const styles = StyleSheet.create({
	subscriptionStatus: {
		// position: 'relative',
		padding: 20,
		// height: 78,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderWidth: 1,
		// borderBottomWidth:0,
		borderColor: "#CFD8DC",
		backgroundColor: "#FFF",
		flexDirection: "row",
		alignItems: "center",
	},
	subscriptionStatusTitle: {
		lineHeight: 18,
		fontSize: 14,
	},
	subscriptionStatusText: {
		// marginTop: 5,
		lineHeight: 13,
		color: "#546E7A",
		fontSize: 10,
	},
	subscriptionStatusLabel: {
		// position: 'absolute',
		// right: 20,
		// top: 20,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 14,
		backgroundColor: "#02A0AE",
	},
	subscriptionStatusInfo: {
		color: "#FFF",
		lineHeight: 11,
		textAlign: "center",
		fontSize: 9,
	},
});
