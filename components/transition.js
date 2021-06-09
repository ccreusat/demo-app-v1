import React from "react";
import _ from "lodash";
import {
	Modal,
	Image,
	Linking,
	Platform,
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
} from "react-native";

import Button from "../components/button";

const Transition = ({ isVisible, close, link }) => (
	<Modal
		transparent={true}
		style={styles.modalContainer}
		animationType="fade"
		visible={isVisible}
		onRequestClose={close}
	>
		<View style={styles.container}>
			<View behavior="padding" style={styles.appContainer}>
				<View
					style={{
						overflow: "hidden",
						borderTopLeftRadius: 10,
						borderTopRightRadius: 10,
					}}
				>
					<Image
						source={require("assets/images/illustration/forget.png")}
						style={styles.containerImage}
						resizeMethod="resize"
					/>
				</View>
				<View style={styles.formContainer}>
					<Text style={styles.appText}>
						Do you want to leave the application ?
					</Text>
					<View style={[styles.buttonContainer, { marginTop: 20 }]}>
						<Button
							action={() => Linking.openURL(link)}
							color="#ED3436"
							colorText="#FFF"
							name="Yes"
						/>
					</View>
				</View>
			</View>
			<TouchableOpacity onPress={close} underlayColor="white">
				<Text style={styles.appLink}>No, I stay</Text>
			</TouchableOpacity>
		</View>
	</Modal>
);

export default Transition;

const styles = StyleSheet.create({
	modalContainer: {
		position: "relative",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 30,
		backgroundColor: "rgba(0,0,0,0.8)",
	},
	appContainer: {
		marginTop: 30,
		borderRadius: 10,
		backgroundColor: "#fff",
		// overflow: 'hidden',
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
	formContainer: {
		position: "relative",
		padding: 30,
	},
	appText: {
		fontSize: 16,
		lineHeight: 20,
		textAlign: "center",
	},
	loadingImage: {
		width: 400,
		height: 400,
	},
	appLink: {
		marginTop: 20,

		fontSize: 14,
		color: "#fff",
		textAlign: "center",
		textDecorationLine: "underline",
	},
});
