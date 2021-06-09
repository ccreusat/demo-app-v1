import { combineReducers } from "redux";
import slides from "./slidesReducer";
import login from "./loginReducer";
import create from "./createReducer";
import main from "./mainReducer";
import product from "./productReducer";
import profile from "./profileReducer";
import wines from "./winesReducer";
import account from "./accountReducer";
import quizz from "./quizzReducer";
import camera from "./cameraReducer";

export default combineReducers({
	slides,
	login,
	create,
	main,
	product,
	profile,
	wines,
	account,
	quizz,
	camera,
});
