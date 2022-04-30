export default (state, action) => {
	switch (action.type) {
		case "SET_ALERT":
			return {
				...state,
				// alerts: [action.payload, ...state.alerts]
				alerts: [action.payload],
			};

		case "REMOVE_ALERT":
			return {
				alerts: state.alerts.filter((alert) => alert.id !== action.payload),
			};

		case "CLEAR_ALERTS":
			return {
				alerts: [],
			};

		default:
			return state;
	}
};
