import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
	const { user } = useContext(AuthContext);
	const location = useLocation();
	console.log(location.pathname);
	if (user) {
		return children; // this children is the page component on the Router.jsx
	}
	return (
		<Navigate
			to="/login"
			state={{ from: location }}
			replace={true}
		></Navigate>
	); // if not authenticated it is routed to login page
};

export default PrivateRouter;
