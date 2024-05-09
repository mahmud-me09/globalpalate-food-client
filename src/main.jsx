import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import Router from "../src/routes/Router";
import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<Router></Router>
		</AuthProvider>
	</React.StrictMode>
);