import React, { createContext, useReducer } from "react";
import { v4 as uuid } from "uuid";

import AlertReducer from "./Reducers/AlertReducer";

const intitialState = {
	alerts: [],
};

export const AlertContext = createContext(intitialState);

export const AlertProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AlertReducer, intitialState);

	const setAlert = (text, type, timeout = 6000) => {
		const id = uuid();
		dispatch({
			type: "SET_ALERT",
			payload: { text, type, id },
		});

		setTimeout(() => dispatch({ type: "REMOVE_ALERT", payload: id }), timeout);
	};

	const clearAlerts = () => {
		dispatch({
			type: "CLEAR_ALERTS",
		});
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state.alerts,
				setAlert,
				clearAlerts,
			}}
		>
			{children}
		</AlertContext.Provider>
	);
};
