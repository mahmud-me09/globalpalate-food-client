import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";

const Router = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root></Root>,
			errorElement: <Error />,
			children: [
				{
					path: "/",
					element: <Home></Home>,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
