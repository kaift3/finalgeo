import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

import AuthReducer from "./Reducers/AuthReducer";
import { AlertContext } from "./AlertContext";

const intitialState = {
	user: null,
	token: null,
	isAuthenticated: false,
	loading: false,
};

export const AuthContext = createContext(intitialState);

export const AuthProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, intitialState);

	const { setAlert } = useContext(AlertContext);

	const setLoading = (loading) => {
		dispatch({
			type: "SET_LOADING",
			payload: loading,
		});
	};

	const loadUser = () => {
		if (localStorage.getItem("token")) {
			let token = JSON.parse(localStorage.getItem("token"));

			axios
				.get("http://localhost:5000/api/auth/", {
					headers: { "x-auth-token": token },
				})
				.then(function (response) {
					if (response.status === 200) {
						dispatch({
							type: "LOAD_USER",
							payload: response.data,
						});
						// setAlert("User Loaded Successfully!", "success");
					}
				})
				.catch(function (error) {
					if (error.response) {
						dispatch({
							type: "AUTH_ERROR",
						});
					}
				});
		} else {
			dispatch({
				type: "AUTH_ERROR",
			});
			setAlert("Access Token Invalid", "danger");
		}
	};

	const login = (email, password) => {
		setLoading(true);

		const payload = {
			email: email,
			password: password,
		};

		axios
			.post("http://localhost:5000/api/auth", payload)
			.then(function (response) {
				if (response.status === 200) {
					dispatch({
						type: "LOGIN_SUCCESS",
						payload: response.data,
					});
					setAlert("Login Successful", "success", 3000);
				}
			})
			.catch(function (error) {
				if (error.response) {
					dispatch({
						type: "LOGIN_FAIL",
						payload: "Authentication Failed.",
					});
					setAlert("Login Failed", "danger");
				}
			});
	};

	const logout = () => {
		dispatch({
			type: "LOGOUT",
		});
		setAlert("You are Logged out!", "danger", 3000);
	};

	const adduser = (name, email, password) => {
		setLoading(true);

		const payload = {
			name: name,
			email: email,
			password: password,
		};

		axios
			.post("http://localhost:5000/api/users/", payload)
			.then(function (response) {
				if (response.status === 201) {
					dispatch({
						type: "SU_SUCCESS",
					});
					setAlert(`User Saved!`, "success");
				}
			})
			.catch((err) => {
				if (err.response) {
					console.log(err.response.data.message);
					dispatch({
						type: "SU_FAIL",
					});
					setAlert(err.response.data.message, "danger");
				}
			});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				user: state.user,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				setLoading,
				loadUser,
				login,
				logout,
				adduser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
