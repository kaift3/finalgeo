import React, { useContext } from "react";
import { NavLink as Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Avatar from "@mui/material/Avatar";
import GroupIcon from "@mui/icons-material/Group";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import StorageIcon from "@mui/icons-material/Storage";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);

	let matlinks = [
		<Link style={{ textDecoration: "none", color: "white" }} to="/about">
			<Button color="inherit">
				<GroupIcon />
				&nbsp;About
			</Button>
		</Link>,
		<Link style={{ textDecoration: "none", color: "white" }} to="/register">
			<Button color="inherit">
				<PersonAddAltIcon />
				&nbsp;Register
			</Button>
		</Link>,
		<Link style={{ textDecoration: "none", color: "white" }} to="/login">
			<Button color="inherit">
				<LoginIcon />
				&nbsp;Login
			</Button>
		</Link>,
	];

	if (localStorage.getItem("token")) {
		matlinks = [
			<Link style={{ textDecoration: "none", color: "white" }} to="/geofence">
				<Button color="inherit">
					<AdminPanelSettingsIcon />
					&nbsp;geofence
				</Button>
			</Link>,
			<Link style={{ textDecoration: "none", color: "white" }} to="/dashboard">
				<Button color="inherit">
					<Avatar
						src={JSON.parse(localStorage.getItem("user")).avatar}
						sx={{ width: 25, height: 25 }}
					/>
					&nbsp;Profile
				</Button>
			</Link>,
			<Button onClick={logout} color="inherit">
				<LogoutIcon />
				&nbsp;Logout
			</Button>,
		];
	}

	return (
		<>
			<header>
				<Box sx={{ flexGrow: 1, width: "100%" }}>
					<AppBar position="static" color="primary">
						<Toolbar>
							<>
								<img
									className="my-2"
									src="https://cdn.discordapp.com/attachments/909801322436505600/933675374628438016/forest-fire.png"
									style={{ width: "3%", maxWidth: "3%" }}
									alt="app logo"
								/>
								<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
									<Link
										style={{ textDecoration: "none", color: "white" }}
										to="/"
									>
										&nbsp;<strong>GIS Application</strong>
									</Link>
								</Typography>
							</>
							<Stack direction="row" spacing={1}>
								{matlinks}
							</Stack>
						</Toolbar>
					</AppBar>
				</Box>
			</header>
		</>
	);
};

export default Navbar;
