import React, { useContext } from "react";
import { AlertContext } from "../../Contexts/AlertContext";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const AlertUI = () => {
	const { alerts, clearAlerts } = useContext(AlertContext);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		clearAlerts();
	};

	return (
		<>
			{alerts.length > 0
				? alerts.map((alert) => (
						<>
							<Snackbar
								anchorOrigin={{ vertical: "top", horizontal: "center" }}
								open="true"
								autoHideDuration={6000}
								onClose={handleClose}
								key={alert.id}
							>
								<Alert severity={alert.type} className="mt-2">
									{alert.text}
								</Alert>
							</Snackbar>
						</>
				  ))
				: null}
		</>
	);
};

export default AlertUI;
