import React, { useState } from "react";
import { Drawer } from "@mui/material";
import "../../Assets/css/Sidebar.css";

const Sidebar = ({ anchor, open, toggleDrawer, children }) => {
	return (
		<>
			{/* <div>Sidebar</div> */}

			<Drawer
				className="sidebar"
				anchor={anchor}
				open={open}
				onClose={toggleDrawer}
			>
				<div className="sidebar-contents">{children}</div>
			</Drawer>
		</>
	);
};

export default Sidebar;
