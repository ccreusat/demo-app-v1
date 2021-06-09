import React from "react";
import { Text, View, StyleSheet } from "react-native";

const WinePrices = props => (
	<View>
		{props.type === "unique" && (
			<View
				style={[styles.productPriceRow, { justifyContent: "center" }]}
			>
				<View>
					<Text
						style={[
							styles.productTextPrice,
							{ textAlign: "center" },
						]}
					>
						{props.info.UT}
					</Text>
					<Text
						style={[
							styles.productPrice,
							{
								color: props.info.priceColor,
								textAlign: "center",
							},
						]}
					>
						{props.info.UP}
					</Text>
				</View>
			</View>
		)}
		{props.type === "prix-fute" && (
			<View
				style={[styles.productPriceRow, { justifyContent: "center" }]}
			>
				<View>
					<Text
						style={[
							styles.productTextPrice,
							{ textAlign: "center" },
						]}
					>
						{props.info.UT}
					</Text>
					<Text
						style={[
							styles.productPrice,
							{
								color: props.info.priceColor,
								textAlign: "center",
							},
						]}
					>
						{props.info.UP}
					</Text>
				</View>
			</View>
		)}
		{props.type === "destockage" && (
			<View
				style={[styles.productPriceRow, { justifyContent: "center" }]}
			>
				<View>
					<Text
						style={[
							styles.productTextPrice,
							{ textAlign: "center" },
						]}
					>
						{props.info.UT}
					</Text>
					<Text
						style={[
							styles.productPrice,
							{
								color: props.info.priceColor,
								textAlign: "center",
							},
						]}
					>
						{props.info.UP}{" "}
						<Text style={{ textDecorationLine: "line-through" }}>
							{props.info.UF}
						</Text>
					</Text>
				</View>
			</View>
		)}
		{props.type === "subscriber" && (
			<View style={styles.productPriceRow}>
				<View>
					<Text style={styles.productTextPrice}>{props.info.T1}</Text>
					<Text style={styles.productPrice}>{props.info.P1}</Text>
				</View>
				<View>
					<Text style={styles.productTextPrice}>{props.info.T2}</Text>
					<Text
						style={[
							styles.productSubPrice,
							{ color: props.info.priceColor },
						]}
					>
						{props.info.P2}
					</Text>
				</View>
			</View>
		)}
		{props.type === "sales" && (
			<View
				style={[styles.productPriceRow, { justifyContent: "center" }]}
			>
				<View>
					<Text
						style={[
							styles.productTextPrice,
							{ textAlign: "center" },
						]}
					>
						{props.info.UT}
					</Text>
					<Text
						style={[
							styles.productPrice,
							{
								color: props.info.priceColor,
								textAlign: "center",
							},
						]}
					>
						{props.info.UF}{" "}
						<Text
							style={{
								textDecorationLine: "line-through",
							}}
						>
							{props.info.UP}
						</Text>
					</Text>
				</View>
			</View>
		)}
	</View>
);

export default WinePrices;

const styles = StyleSheet.create({
	productPrice: {
		marginTop: 4,
		textAlign: "center",
		fontSize: 22,
		color: "#546E7A",
	},
	productSubPrice: {
		marginTop: 4,
		textAlign: "center",
		fontSize: 22,
	},
	productTextPrice: {
		textAlign: "center",
		fontSize: 9,

		textTransform: "uppercase",
	},
	productPriceRow: {
		padding: 30,
		paddingTop: 0,
		paddingBottom: 15,
		flexDirection: "row",
		// alignItems:'flex-start',
		justifyContent: "space-between",
	},
});
