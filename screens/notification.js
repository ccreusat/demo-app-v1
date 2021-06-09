import React, { Component } from "react";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Notifications } from "expo";
// import * as Permissions from 'expo-permissions';

import NotificationList from "containers/notification-list";
import NotificationEmpty from "../components/notification-empty";
export default class Notification extends Component {
	static navigationOptions = { title: "Notifications" };

	state = {
		notifications: [],
		notification: "",
	};

	componentDidMount = async () => {
		this._getNotification();
		this._notificationSubscription = Notifications.addListener(
			this._handleNotification
		);
	};

	_handleNotification = notification => {
		console.log(notification);
		this.setState({ notification }, () => {
			let { notification, notifications } = this.state;
			let notificationsArray = notifications ? notifications : [];

			notificationsArray.push(notification);

			this.setState(
				{
					notifications: notificationsArray,
				},
				() => {
					this._storeNotification(this.state.notifications);
				}
			);
		});
	};

	_getNotification = async () => {
		let getNotifications = await AsyncStorage.getItem("pushNotifications");

		if (getNotifications) {
			let notifications = JSON.parse(getNotifications);
			this.setState({ notifications });
		}
	};

	_storeNotification = async array => {
		try {
			await AsyncStorage.setItem(
				"pushNotifications",
				JSON.stringify(array)
			);
			// console.log(array);
		} catch (error) {
			console.log("not working");
		}
	};

	render() {
		const { notifications } = this.state;

		// console.log(notifications)

		if (notifications && notifications.length) {
			return (
				<NotificationList
					notifications={notifications}
					post={this.postNotification}
				/>
			);
		}

		return <NotificationEmpty />;
	}
}
