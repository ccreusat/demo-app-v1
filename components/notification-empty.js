import React from "react";
import {
	StyleSheet,
	View,
	Image,
	Text,
	Platform,
	ScrollView,
} from "react-native";

const NotificationEmpty = () => (
	<ScrollView style={{ flex: 1, backgroundColor: "#ECEFF1", padding: 30 }}>
		<View style={[styles.appContainer, { marginBottom: 60 }]}>
			<View
				style={{
					overflow: "hidden",
					borderTopLeftRadius: 10,
					borderTopRightRadius: 10,
				}}
			>
				<Image
					source={require("assets/images/illustration/login.png")}
					style={styles.containerImage}
					resizeMethod="resize"
				/>
			</View>
			<View style={styles.appContent}>
				<Text style={styles.appTitle}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit
				</Text>
			</View>
		</View>
	</ScrollView>
);

export default NotificationEmpty;

const styles = StyleSheet.create({
	appContainer: {
		borderRadius: 10,
		backgroundColor: "#fff",
		...Platform.select({
			ios: {
				shadowColor: "#000",
				shadowOffset: { height: 2, width: 0 },
				shadowOpacity: 0.35,
				shadowRadius: 0.6,
			},
			android: {
				elevation: 1,
			},
		}),
	},
	containerImage: {
		width: undefined,
		height: 160,
	},
	appContent: {
		padding: 30,
	},
	appTitle: {
		lineHeight: 24,
		fontSize: 17,
		textAlign: "center",
	},
	appText: {
		marginTop: 20,

		fontSize: 12,
		lineHeight: 18,
		textAlign: "center",
	},
});
