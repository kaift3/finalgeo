import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./Contexts/AuthContext";
import { AlertProvider } from "./Contexts/AlertContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AlertProvider>
				<AuthProvider>
					<App />
				</AuthProvider>
			</AlertProvider>
		</BrowserRouter>
	</React.StrictMode>
);
