import React from "react";
import { Image, Text, StyleSheet, View, TouchableOpacity } from "react-native";

const NotificationDetail = ({ image, title, time, text, url, action }) => (
	<View>
		{url ? (
			<TouchableOpacity
				onPress={action}
				style={styles.notificationContainer}
			>
				<Image source={image} style={styles.notificationIcon} />
				<View style={{ marginLeft: 20 }}>
					<Text style={styles.notificationTitle}>{title}</Text>
					<Text style={styles.notificationText}>{text}</Text>
				</View>
				<Image
					source={require("assets/icons/baseline_chevron_right_black.png")}
					style={styles.notificationChevron}
				/>
			</TouchableOpacity>
		) : (
			<TouchableOpacity style={[styles.notificationContainer]}>
				<Image source={image} style={styles.notificationIcon} />
				<View style={{ marginLeft: 20 }}>
					<Text style={styles.notificationTitle}>{title}</Text>
					<Text style={styles.notificationText}>{text}</Text>
					<Text style={styles.notificationTime}>{time}</Text>
				</View>
			</TouchableOpacity>
		)}
	</View>
);

export default NotificationDetail;

const styles = StyleSheet.create({
	notificationContainer: {
		backgroundColor: "#FFF",
		paddingVertical: 14,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		borderTopWidth: 1,
		borderTopColor: "#CFD8DC",
	},
	notificationIcon: {
		width: 46,
		height: 46,
	},
	notificationTitle: {
		color: "#37474F",
		fontSize: 14,

		lineHeight: 16,
	},
	notificationText: {
		color: "#37474F",
		fontSize: 12,

		lineHeight: 16,
	},
	notificationTime: {
		color: "#90A4AE",
		fontSize: 10,

		lineHeight: 18,
	},
	notificationChevron: {
		position: "absolute",
		right: 20,
		top: 25,
		width: 30,
		height: 30,
	},
});
