import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";

import GeoReducer from "./Reducers/GeoReducer";
import { AlertContext } from "./AlertContext";

const intitialState = {
	data: null,
	loading: false,
};

export const GeoContext = createContext(intitialState);

export const GeoProvider = ({ children }) => {
	const [state, dispatch] = useReducer(GeoReducer, intitialState);

	const { setAlert } = useContext(AlertContext);

	const setLoading = (loading) => {
		dispatch({
			type: "SET_LOADING",
			payload: loading,
		});
	};

	const savePoint = (name, description, latlng) => {
		setLoading(true);

		const payload = {
			name: name,
			description: description,
			latlng: latlng,
		};

		if (localStorage.getItem("token")) {
			let token = JSON.parse(localStorage.getItem("token"));

			axios
				.post("http://localhost:5000/api/points/", payload, {
					headers: { "x-auth-token": token },
				})
				.then(function (response) {
					if (response.status === 201) {
						dispatch({
							type: "SD_SUCCESS",
						});
						setAlert("Point Saved Successfully!", "success");
					}
				})
				.catch(function (error) {
					if (error.response) {
						dispatch({
							type: "DATA_ERROR",
						});
					}
				});
		} else {
			dispatch({
				type: "DATA_ERROR",
			});
			setAlert("Access Token Invalid", "danger");
		}
	};

	const getAllPoints = () => {
		if (localStorage.getItem("token")) {
			let token = JSON.parse(localStorage.getItem("token"));

			axios
				.get("http://localhost:5000/api/points/", {
					headers: { "x-auth-token": token },
				})
				.then(function (response) {
					if (response.status === 200) {
						dispatch({
							type: "LOAD_DATA",
							payload: response.data,
						});
						setAlert("Data Loaded Successfully!", "success");
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

	const getOnePoint = (id) => {
		if (localStorage.getItem("token")) {
			let token = JSON.parse(localStorage.getItem("token"));

			axios
				.get(`http://localhost:5000/api/points/${id}`, {
					headers: { "x-auth-token": token },
				})
				.then(function (response) {
					if (response.status === 200) {
						dispatch({
							type: "LOAD_DATA",
							payload: response.data,
						});
						setAlert("Data Loaded Successfully!", "success");
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

	const deletePoint = (id) => {
		if (localStorage.getItem("token")) {
			let token = JSON.parse(localStorage.getItem("token"));

			axios
				.delete(`http://localhost:5000/api/points/${id}`, {
					headers: { "x-auth-token": token },
				})
				.then(function (response) {
					if (response.status === 204) {
						dispatch({
							type: "SD_SUCCESS",
						});
						setAlert("Data Deleted Successfully!", "success");
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

	const savePolygon = (name, description, coords) => {
		setLoading(true);

		const payload = {
			name: name,
			description: description,
			coords: coords,
		};

		if (localStorage.getItem("token")) {
			let token = JSON.parse(localStorage.getItem("token"));

			axios
				.post("http://localhost:5000/api/polygons/", payload, {
					headers: { "x-auth-token": token },
				})
				.then(function (response) {
					if (response.status === 201) {
						dispatch({
							type: "SD_SUCCESS",
						});
						setAlert("Polygon Saved Successfully!", "success");
					}
				})
				.catch(function (error) {
					if (error.response) {
						dispatch({
							type: "DATA_ERROR",
						});
					}
				});
		} else {
			dispatch({
				type: "DATA_ERROR",
			});
			setAlert("Access Token Invalid", "danger");
		}
	};

	const getAllPolygons = () => {
		if (localStorage.getItem("token")) {
			let token = JSON.parse(localStorage.getItem("token"));

			axios
				.get("http://localhost:5000/api/polygons/", {
					headers: { "x-auth-token": token },
				})
				.then(function (response) {
					if (response.status === 200) {
						dispatch({
							type: "LOAD_DATA",
							payload: response.data,
						});
						setAlert("Data Loaded Successfully!", "success");
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

	const getOnePolygon = (id) => {
		if (localStorage.getItem("token")) {
			let token = JSON.parse(localStorage.getItem("token"));

			axios
				.get(`http://localhost:5000/api/polygons/${id}`, {
					headers: { "x-auth-token": token },
				})
				.then(function (response) {
					if (response.status === 200) {
						dispatch({
							type: "LOAD_DATA",
							payload: response.data,
						});
						setAlert("Data Loaded Successfully!", "success");
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

	const deletePolygon = (id) => {
		if (localStorage.getItem("token")) {
			let token = JSON.parse(localStorage.getItem("token"));

			axios
				.delete(`http://localhost:5000/api/polygons/${id}`, {
					headers: { "x-auth-token": token },
				})
				.then(function (response) {
					if (response.status === 204) {
						dispatch({
							type: "SD_SUCCESS",
						});
						setAlert("Data Deleted Successfully!", "success");
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

	return (
		<GeoContext.Provider
			value={{
				data: state.data,
				loading: state.loading,
				setLoading,
				savePoint,
				getAllPoints,
				getOnePoint,
				deletePoint,
				savePolygon,
				getAllPolygons,
				getOnePolygon,
				deletePolygon,
			}}
		>
			{children}
		</GeoContext.Provider>
	);
};
