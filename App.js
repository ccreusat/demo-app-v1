import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import AppContainer from "./utils/routes";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
// const store = createStore(rootReducer);

export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Provider store={createStoreWithMiddleware(rootReducer)}>
				<AppContainer />
			</Provider>
		);
	}
}
