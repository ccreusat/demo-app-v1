import React, { Component } from "react";
import _ from "lodash";
import { StyleSheet, ScrollView, Linking } from "react-native";

import NotificationDetail from "../components/notification-detail";

import getImageForNotification from "utils/getIconForNotification";

export default class NotificationList extends Component {
	_renderNotification = (notification, index) => {
		return (
			<NotificationDetail
				key={index}
				image={getImageForNotification(notification.data.icon)}
				title={notification.data.title}
				text={notification.data.body}
				url={notification.data.url}
				read={notification.data.type}
				action={() => Linking.openURL(notification.data.url)}
			/>
		);
	};

	render() {
		const { notifications } = this.props;

		return (
			<ScrollView style={styles.container}>
				{notifications &&
					notifications.map((notification, index) => {
						return this._renderNotification(notification, index);
					})}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
