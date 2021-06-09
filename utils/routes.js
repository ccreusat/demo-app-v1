import React from "react";
import { Image } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

/*
- Welcome (StackNavigator)
    - Allow
- Auth (StackNavigator)
    - Login
    - Login Forget
    - Create Account
    - Guest Navigator (TabNavigator)
        - Wines (StackNavigator)
            - Scan
        - Auth
- Tab Navigator (TabNavigator)
    - Main
    - Wines (StackNavigator)
        - Scan
        - Recents
        - Purchased
    - User (StackNavigator)
        - Profile
        - Account
        - Settings
    - Notification (StackNavigator)

*/

// LoadingStack (StackNavigator)
import Loading from "screens/loading";
import Start from "screens/start";

// Auth (StackNavigator)
import Auth from "screens/authentication";
import Login from "screens/login";
import Forget from "screens/forget";
import CreateAccount from "screens/create";

// Tab Navigator (TabNavigator)
import Main from "screens/main";
import Wines from "screens/wines";
import Camera from "screens/camera";
import User from "screens/user";
import Notification from "screens/notification";

// Quizz
import Quizz from "screens/quizz";

// Guest
import Scan from "containers/scan";

import NotificationBadge from "components/notification-badge";

const LoadingStack = createStackNavigator({
	Loading: Loading,
});

const StartStack = createStackNavigator({
	Start: Start,
});

const QuizzStack = createStackNavigator({
	Quizz: Quizz,
});

const AuthStack = createStackNavigator(
	{
		Auth,
		Login,
		Forget,
		CreateAccount,
	},
	{
		initialRouteName: "Auth",
		defaultNavigationOptions: {
			headerStyle: {
				borderBottomWidth: 1,
				borderBottomColor: "#0F93A1",
				backgroundColor: "#3FA9B4",
			},
			headerTintColor: "white",
			headerTitleStyle: {
				color: "white",

				fontSize: 18,
			},
		},
	}
);

const commonDefaultOptions = {
	headerStyle: {
		borderBottomWidth: 1,
		borderBottomColor: "#0F93A1",
		backgroundColor: "#3FA9B4",
	},
	headerTintColor: "#fff",
	headerTitleStyle: {
		color: "#fff",

		fontSize: 18,
	},
};

const MainStack = createStackNavigator({ Main });

const WineStack = createStackNavigator({
	Wines: {
		screen: Wines,
		navigationOptions: commonDefaultOptions,
	},
});
const UserStack = createStackNavigator({
	User: {
		screen: User,
		navigationOptions: commonDefaultOptions,
	},
});
const NotificationStack = createStackNavigator({
	Notification: {
		screen: Notification,
		navigationOptions: commonDefaultOptions,
	},
});
const ScanStack = createStackNavigator({
	Scan: {
		screen: Scan,
		navigationOptions: commonDefaultOptions,
	},
});

const AppNavigator = createBottomTabNavigator(
	{
		Main: MainStack,
		Wines: WineStack,
		Camera,
		User: UserStack,
		Notification: NotificationStack,
	},
	{
		initialRouteName: "Main",
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused }) => {
				const { routeName } = navigation.state;
				let source;
				// let styleOpac;
				// styleOpac = focused ? {opacity: 0.30} : '';
				if (routeName === "Main") {
					source = focused
						? require("assets/icons/baseline_home_black.png")
						: require("assets/icons/outline_home_black.png");
				} else if (routeName === "Wines") {
					source = focused
						? require("assets/icons/baseline_list_black.png")
						: require("assets/icons/baseline_toc_black.png");
				} else if (routeName === "Camera") {
					source = require("assets/icons/camera.png");
				} else if (routeName === "User") {
					source = focused
						? require("assets/icons/baseline_account_circle_black.png")
						: require("assets/icons/outline_account_circle_black.png");
				} else if (routeName === "Notification") {
					if (focused) {
						return (
							<Image
								style={{ width: 30, height: 30 }}
								source={require("assets/icons/baseline_notifications_black.png")}
							/>
						);
					}
					return <NotificationBadge />;
					// focused ? <Image style={{width: 30, height: 30}} source={require('assets/icons/baseline_notifications_black.png')} /> : <NotificationBadge />
				}
				return (
					<Image
						source={source}
						style={[
							routeName === "Camera"
								? { width: 80, height: 80, marginTop: -40 }
								: { width: 30, height: 30 },
						]}
					/>
				);
			},
			tabBarOptions: { showLabel: false },
		}),
	}
);

const GuestNavigator = createBottomTabNavigator(
	{
		Scan: ScanStack,
		Camera,
		User: Auth,
	},
	{
		initialRouteName: "Scan",
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused }) => {
				const { routeName } = navigation.state;
				let source;
				// let styleOpac;
				// styleOpac = focused ? {opacity: 0.30} : '';
				if (routeName === "Scan") {
					source = focused
						? require("assets/icons/baseline_list_black.png")
						: require("assets/icons/baseline_toc_black.png");
				} else if (routeName === "Camera") {
					source = require("assets/icons/camera.png");
				} else if (routeName === "User") {
					source = focused
						? require("assets/icons/baseline_account_circle_black.png")
						: require("assets/icons/outline_account_circle_black.png");
				}
				return (
					<Image
						source={source}
						style={[
							routeName === "Camera"
								? { width: 80, height: 80, marginTop: -40 }
								: { width: 30, height: 30 },
						]}
					/>
				);
			},
			tabBarOptions: { showLabel: false },
		}),
	}
);

export default createAppContainer(
	createSwitchNavigator({
		// Loading: LoadingStack,
		Start: StartStack,
		Auth: AuthStack,
		Quizz: QuizzStack,
		App: AppNavigator,
		Scan: GuestNavigator,
	})
);
