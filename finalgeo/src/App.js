import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import Home from "./Pages/Home";
import Login from "./Components/auth/Login";
import Register from "./Components/auth/Register";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import GeoFence from "./Pages/GeoFence";
import GeoTag from "./Pages/GeoTag";
import ShortestRoutes from "./Pages/ShortestRoutes";
import Navbar from "./Components/layout/Navbar";
import Nav from "./Components/Nav";
import Sidebar from "./Components/Sidebar";
import setAuthToken from "./Services/setAuthToken";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PageNotFound from "./Components/layout/PageNotFound";
import { AuthContext } from "./Contexts/AuthContext";
import AlertUI from "./Components/layout/AlertUI";

function App() {
	const { loadUser, logout } = useContext(AuthContext);

	if (localStorage.getItem("token") !== "") {
		setAuthToken(JSON.parse(localStorage.getItem("token")));
	} else {
		logout();
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			loadUser();
		}
	}, []);

	return (
		<div className="App">
			<Router>
				{/* <Navbar />
      <Login />
      <SignUp /> */}
				<Navbar />
				<AlertUI />
				{/* <Nav /> */}
				{/* <Sidebar /> */}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/geofence" element={<GeoFence />} />
					<Route path="/geotag" element={<GeoTag />} />
					<Route path="/routes" element={<ShortestRoutes />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
