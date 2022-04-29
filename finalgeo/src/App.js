import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import About from "./Pages/About";
import GeoFence from "./Pages/GeoFence";
import GeoTag from "./Pages/GeoTag";
import ShortestRoutes from "./Pages/ShortestRoutes";
import Navbar from "./Components/Navbar";
import Nav from "./Components/Nav";
import Sidebar from "./Components/Sidebar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
function App() {
	const theme = createTheme();
	return (
		<>
			<ThemeProvider theme={theme}>
				<div className="App">
					<Router>
						{/* <Navbar />
    <Login />
    <SignUp /> */}
						<Navbar />
						{/* <Nav /> */}
						{/* <Sidebar /> */}
						<Routes>
							<Route path="/home" exact element={<Home />} />
							<Route path="/about" exact element={<About />} />
							<Route path="/login" exact element={<Login />} />
							<Route path="/signup" exact element={<SignUp />} />
							<Route path="/geofence" exact element={<GeoFence />} />
							<Route path="/geotag" exact element={<GeoTag />} />
							<Route path="/routes" exact element={<ShortestRoutes />} />
						</Routes>
					</Router>
				</div>
			</ThemeProvider>
		</>
	);
}

export default App;
