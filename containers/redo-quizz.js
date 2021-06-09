import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { withNavigation } from "react-navigation";

class RedoQuizz extends Component {
	_goToQuizz = () => {
		this.props.navigation.navigate({ routeName: "Quizz" });
	};

	render() {
		return (
			<View style={styles.profileQuiz}>
				<TouchableOpacity onPress={() => this._goToQuizz()}>
					<Text style={styles.profileQuizText}>
						Vous n'êtes pas tout à fait d'accord avec le résultat ?
						Vous pouvez refaire le{" "}
						<Text style={{ textDecorationLine: "underline" }}>
							quizz
						</Text>
						.
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default withNavigation(RedoQuizz);

const styles = StyleSheet.create({
	profileQuiz: {
		backgroundColor: "#37474F",
		paddingVertical: 15,
		paddingHorizontal: 50,
	},
	profileQuizText: {
		color: "#FFF",
		fontSize: 12,
		textAlign: "center",
	},
});
