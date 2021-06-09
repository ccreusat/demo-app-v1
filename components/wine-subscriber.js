import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

import getColorForProfile from "utils/getColorForProfile";

const WineSubscriber = props => (
	<TouchableOpacity style={styles.productItem} onPress={props.action}>
		<Image source={{ uri: props.image }} style={styles.productImage} />
		<Text
			style={styles.productTitle}
			numberOfLines={2}
			ellipsizeMode="tail"
		>
			{props.name}
		</Text>
		<Text style={styles.productAOP} numberOfLines={1} ellipsizeMode="tail">
			{props.aop}
		</Text>
		<View
			style={[
				styles.productLabel,
				{ backgroundColor: getColorForProfile(props.color) },
			]}
		>
			<Text style={styles.productLabelText}>{props.label}</Text>
		</View>
	</TouchableOpacity>
);

export default WineSubscriber;

const styles = StyleSheet.create({
	productItem: {
		marginTop: 10,
		flexBasis: "48%",
		backgroundColor: "#FFF",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 6,
	},
	productImage: {
		width: 80,
		height: 192,
	},
	productTitle: {
		paddingHorizontal: 10,
		fontSize: 10,

		lineHeight: 14,
		height: 30,
		color: "#37474F",
		textAlign: "center",
	},
	productAOP: {
		paddingHorizontal: 10,
		fontSize: 9,

		lineHeight: 13,
		color: "#37474F",
		textAlign: "center",
		marginTop: 5,
	},
	productLabel: {
		paddingTop: 2,
		paddingBottom: 4,
		marginTop: 15,
		alignSelf: "stretch",
		backgroundColor: "#D22E1C",
		borderBottomLeftRadius: 6,
		borderBottomRightRadius: 6,
	},
	productLabelText: {
		fontSize: 10,

		color: "#FFF",
		textAlign: "center",
	},
});
