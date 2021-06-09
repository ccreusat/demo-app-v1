import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const Gazette = ({ data }) => (
	<View style={{ marginTop: 20 }}>
		<Text style={styles.mainTitle}>Ce mois-ci</Text>
		<View
			style={[
				styles.gazetteContent,
				{ backgroundColor: data.gazette.bgcolor },
			]}
		>
			<Image
				source={{ uri: data.gazette && data.gazette.image }}
				style={{
					width: 230,
					height: 230,
					marginTop: 60,
					marginLeft: -30,
				}}
			/>
			<Text style={styles.gazetteText}>{data.gazette.title}</Text>
		</View>
	</View>
);

export default Gazette;

const styles = StyleSheet.create({
	mainTitle: {
		paddingBottom: 20,
		fontSize: 20,
		textAlign: "left",
		lineHeight: 20,
	},
	gazetteContent: {
		overflow: "hidden",
		height: 170,
		borderRadius: 10,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	gazetteText: {
		position: "relative",
		left: -30,
		color: "#FFF",
		fontSize: 16,
		lineHeight: 18,
		width: 140,
	},
});
