const slides = [
	{
		key: "scan",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
		image: require("../assets/images/presentation/1.png"),
		colors: ["#FBAA7E", "#F9935B"],
	},
	{
		key: "user",
		text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
		image: require("../assets/images/presentation/2.png"),
		colors: ["#FEC33A", "#FEB32C"],
	},
];

const slidesReducer = (state = slides, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default slidesReducer;
