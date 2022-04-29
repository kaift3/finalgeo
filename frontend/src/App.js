import { Routes, Route } from "react-router-dom";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import AlertUI from "./Components/layout/AlertUI";
import Landing from "./Components/layout/Landing";
import Navbar from "./Components/layout/Navbar";
import PrivateRoute from "./Components/routes/PrivateRoute";
import { AuthContext } from "./Contexts/AuthContext";
import React, { useEffect, useContext } from "react";
import jwt from "jsonwebtoken";
import setAuthToken from "./Services/setAuthToken";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PageNotFound from "./Components/layout/PageNotFound";
import GeoFence from "./Components/geo/GeoFence";

function App() {
	const { loadUser, logout } = useContext(AuthContext);

	if (localStorage.getItem("token")) {
		setAuthToken(JSON.parse(localStorage.getItem("token")));

		jwt.verify(
			JSON.parse(localStorage.getItem("token")),
			"mysecrettoken",
			function(err, decode) {
				if (err) {
					console.log(err);
					logout();
				} else {
					// loadUser()
				}
			}
		);
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			loadUser();
		}
	}, []);

	// Theme for the App
	const theme = createTheme();

	return (
		<>
			<ThemeProvider theme={theme}>
				<div>
					<AlertUI />
					<Navbar />
					{/* <AlertUI /> */}
					<Routes>
						<Route path="/" element={<Landing />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route
							path="/geofence"
							element={
								<PrivateRoute>
									<GeoFence />
								</PrivateRoute>
							}
						/>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</div>
			</ThemeProvider>
		</>
	);
}

export default App;
