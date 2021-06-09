import React from "react";
import _ from "lodash";
import {
	Modal,
	Image,
	StyleSheet,
	View,
	Text,
	Platform,
	TouchableOpacity,
} from "react-native";

const PhotoDetail = ({ isVisible, close, data, action, id }) => (
	<Modal
		transparent={true}
		style={styles.modalContainer}
		animationType="fade"
		visible={isVisible}
		onRequestClose={close}
	>
		<View style={styles.modalContent}>
			{id === null && (
				<View style={styles.photoDetailLoader}>
					<Image
						source={require("assets/images/loading/loader.gif")}
						style={{ width: 200, height: 200 }}
					/>
				</View>
			)}
			<View style={{ marginTop: -100 }}>
				<Image
					source={{ uri: data }}
					style={styles.photoDetailImage}
					resizeMethod="resize"
				/>
				{id === null && (
					<Text style={styles.photoDetailText}>
						Analyse de la photo en cours...
					</Text>
				)}
			</View>
			<View style={styles.photoDetailBar}>
				<TouchableOpacity
					onPress={close}
					style={styles.photoDetailButton}
				>
					<Text
						style={[
							styles.photoDetailButtonText,
							{ textAlign: "left", paddingLeft: 20 },
						]}
					>
						Annuler
					</Text>
				</TouchableOpacity>
				{id !== null && (
					<TouchableOpacity
						onPress={action}
						style={styles.photoDetailButton}
					>
						<Text
							style={[
								styles.photoDetailButtonText,
								{ textAlign: "right", paddingRight: 20 },
							]}
						>
							Confirmer
						</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	</Modal>
);

export default PhotoDetail;

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		backgroundColor: "#FFF",
	},
	modalContent: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#FFF",
	},
	photoDetailBar: {
		backgroundColor: "#02A0AE",
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		height: Platform.OS === "ios" ? 130 : 100,
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	photoDetailImage: {
		width: 300,
		height: 500,
	},
	photoDetailLoader: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 100,
		width: "100%",
		height: "100%",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	photoDetailText: {
		color: "#000",
		marginTop: 20,
		textAlign: "center",
	},
	photoDetailButton: {
		// alignItems:'center',
		paddingVertical: 40,
		width: "50%",
		height: Platform.OS === "ios" ? 130 : 100,
	},
	photoDetailButtonText: {
		color: "#fff",

		fontSize: 16,
	},
});
