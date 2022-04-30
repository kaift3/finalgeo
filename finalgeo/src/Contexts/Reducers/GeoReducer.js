const GeoReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return {
				...state,
				loading: action.payload,
			};

		case "SD_SUCCESS":
			return {
				...state,
				loading: false,
			};

		case "LOAD_DATA":
			return {
				...state,
				data: action.payload,
				loading: false,
			};

		case "DATA_ERROR":
			return {
				...state,
				data: null,
				loading: false,
			};

		default:
			return state;
	}
};

export default GeoReducer;
