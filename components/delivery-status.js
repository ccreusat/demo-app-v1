import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

import getIconForDelivery from "utils/getIconForDelivery";

const DeliveryStatus = props => (
	<TouchableOpacity onPress={props.action}>
		<View
			style={[
				styles.deliveryStatus,
				{ backgroundColor: props.color, position: "relative" },
			]}
		>
			<View>
				<Text
					style={[
						styles.deliveryStatusTitle,
						{ color: props.colorText },
					]}
				>
					{props.status}
				</Text>
			</View>
			<View style={{ marginRight: 20 }}>
				<Text
					style={[
						styles.deliveryStatusLink,
						{
							color: props.colorText,
							fontSize: 13,
						},
					]}
				>
					{props.link}
				</Text>
			</View>
			{props.arrow === "active" && (
				<Image
					source={getIconForDelivery("shipping")}
					style={styles.deliveryStatusChevron}
				/>
			)}
		</View>
	</TouchableOpacity>
);

export default DeliveryStatus;

const styles = StyleSheet.create({
	deliveryStatus: {
		height: 50,
		paddingHorizontal: 20,
		borderTopWidth: 1,
		borderTopColor: "rgba(0,0,0,0.15)",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	deliveryStatusTitle: {
		fontSize: 14,
	},
	deliveryStatusText: {
		width: 150,
		textAlign: "right",
	},
	deliveryStatusLink: {
		textAlign: "right",
	},
	deliveryStatusChevron: {
		width: 16,
		height: 16,
		position: "absolute",
		right: 10,
		top: "50%",
		marginTop: -8,
	},
});
