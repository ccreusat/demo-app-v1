import React from "react";
import {
	Text,
	StyleSheet,
	View,
	Image,
	TouchableOpacity,
	Platform,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

const wineItem = props => (
	<TouchableOpacity onPress={props.action}>
		<View style={styles.wineItem}>
			<Image
				source={{ uri: props.image }}
				style={{ width: 65, height: 156 }}
			/>
			<View style={styles.wineContent}>
				<View
					style={[styles.wineLabel, { backgroundColor: props.color }]}
				>
					<Text style={styles.wineLabelText}>{props.label}</Text>
				</View>
				<Text
					style={styles.wineTitle}
					numberOfLines={1}
					ellipsizeMode="tail"
				>
					{props.name}
				</Text>
				<Text style={styles.wineMaker}>{props.domain}</Text>
				<Text style={styles.wineAOP}>{props.aop}</Text>
				{props.subprice === "" && (
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
							marginTop: 10,
						}}
					>
						<Text style={[styles.winePrice, { marginRight: 5 }]}>
							Prix Unique pour tous :
						</Text>
						<Text style={styles.winePriceSubscriber}>
							{parseFloat(props.price).toFixed(2)} €
						</Text>
					</View>
				)}
				{props.subprice !== "" && (
					<View
						style={{
							flexDirection: "row",
							justifyContent: "flex-start",
							alignItems: "center",
							marginTop: 10,
						}}
					>
						<Text style={[styles.winePrice, { marginRight: 5 }]}>
							Prix abonnés :
						</Text>
						<Text
							style={[
								styles.winePriceSubscriber,
								{ marginRight: 5 },
							]}
						>
							{parseFloat(props.subprice).toFixed(2)} €
						</Text>
						<Text style={styles.winePriceOld}>
							{parseFloat(props.price).toFixed(2)} €
						</Text>
					</View>
				)}
			</View>
			<Image
				source={require("assets/icons/baseline_chevron_right_black.png")}
				style={styles.wineChevron}
			/>
		</View>
	</TouchableOpacity>
);

export default wineItem;

const styles = StyleSheet.create({
	wineItem: {
		paddingHorizontal: 20,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFF",
		borderBottomWidth: 1,
		borderBottomColor: "#CFD8DC",
		...Platform.select({
			ios: {
				shadowColor: "rgba(0,0,0,0.30)",
				shadowOffset: { height: 0, width: 0 },
				shadowOpacity: 1,
				shadowRadius: 1,
			},
			android: {
				elevation: 1,
			},
		}),
	},
	wineContent: {
		paddingLeft: 20,
		paddingRight: 80,
	},
	wineLabel: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 14,
		alignSelf: "flex-start",
	},
	wineLabelText: {
		color: "#FFF",
		fontSize: RFValue(1.5),
	},
	wineTitle: {
		// flex:1,
		marginTop: 10,
		fontSize: RFValue(2),

		// overflow: 'hidden',
		// width: '80%',
	},
	wineMaker: {
		fontSize: RFValue(1.8),
	},
	wineAOP: {
		fontSize: RFValue(1.5),

		textTransform: "uppercase",
	},
	winePrice: {
		fontSize: RFValue(1.6),

		color: "#90A4AE",
		textTransform: "uppercase",
	},
	winePriceSubscriber: {
		fontSize: RFValue(1.8),

		color: "#0F93A1",
	},
	winePriceOld: {
		marginTop: 2,
		fontSize: RFValue(1.8),
		color: "#90A4AE",
		textDecorationLine: "line-through",
	},
	wineChevron: {
		position: "absolute",
		right: 10,
		top: "50%",
		marginTop: -15,
		width: 30,
		height: 30,
	},
	wineType: {
		paddingVertical: 8,
	},
	wineDiscount: {
		textAlign: "center",
		textTransform: "uppercase",
		fontSize: 12,
	},
});
