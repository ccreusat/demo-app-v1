import React, { Component } from "react";
import {
	ScrollView,
	StyleSheet,
	View,
	Image,
	Text,
	Platform,
} from "react-native";

import { withNavigation } from "react-navigation";
import Button from "../components/button";

class ScanEmpty extends Component {
	_goToCamera = () => {
		this.props.navigation.navigate({
			routeName: "Camera",
			params: {
				test: "label",
			},
		});
	};

	render() {
		return (
			<ScrollView
				style={{ flex: 1, backgroundColor: "#ECEFF1", padding: 30 }}
			>
				<View style={[styles.appContainer, { marginBottom: 60 }]}>
					<View
						style={{
							overflow: "hidden",
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
						}}
					>
						<Image
							source={require("assets/images/illustration/camera.png")}
							style={styles.containerImage}
							resizeMethod="resize"
						/>
					</View>
					<View style={styles.appContent}>
						<Text>{this.props.empty}</Text>
						<Text style={styles.appTitle}>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit
						</Text>
						<Text style={styles.appText}>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit
						</Text>
						<Button
							action={() => this._goToCamera()}
							name="Scan"
							color="#ED3436"
							colorText="#FFF"
							top={30}
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}

export default withNavigation(ScanEmpty);

const styles = StyleSheet.create({
	appContainer: {
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
