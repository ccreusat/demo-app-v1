import React from "react";
import { View, StyleSheet } from "react-native";

const Separator = () => <View style={styles.separator}></View>;

export default Separator;

const styles = StyleSheet.create({
	separator: {
		marginVertical: 20,
		// marginHorizontal: 20,
		height: 1,
		backgroundColor: "#CFD8DC",
	},
});
