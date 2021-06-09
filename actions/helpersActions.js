import { NavigationActions } from "react-navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function signInAsync(token) {
	await AsyncStorage.setItem("userToken", token);
}

export async function signOutAsync() {
	await AsyncStorage.removeItem("userToken");
	NavigationActions.navigate("Auth");
}
