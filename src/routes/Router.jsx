import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";
import AllFoodPage from "../pages/allFoodPage/AllFoodPage";
import FoodDetailPage from "../pages/foodDetailPage/FoodDetailPage";

import LoginPage from "../pages/loginPage/LoginPage";
import RegistrationPage from "../pages/registrationPage/RegistrationPage";
import MyAddedFoodPage from "../pages/myAddedFoodsPage/MyAddedFoodPage";
import AddFoodPage from "../pages/addFoodPage/AddFoodPage";
import MyOrderPage from "../pages/myOrder/MyOrderPage";
import GalleryPage from "../pages/galleryPage/GalleryPage";
import UpdateFoodPage from "../pages/updateFoodPage/UpdateFoodPage";

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
				{
					path: "/allfood",
					element: <AllFoodPage></AllFoodPage>,
				},
				{
					path: "/fooddetail/:id",
					element: <FoodDetailPage></FoodDetailPage>,
				},
				{
					path: "/gallery",
					element: <GalleryPage></GalleryPage>,
				},
				
				{
					path: "/login",
					element: <LoginPage></LoginPage>,
				},
				{
					path: "/registration",
					element: <RegistrationPage></RegistrationPage>,
				},
				{
					path: "/myaddedfoods",
					element: <MyAddedFoodPage></MyAddedFoodPage>,
				},
				{
					path: "/addfood",
					element: <AddFoodPage></AddFoodPage>,
				},
				{
					path: "/myorder",
					element: <MyOrderPage></MyOrderPage>,
				},
				{
					path: "/updatefood/:id",
					element: <UpdateFoodPage></UpdateFoodPage>,
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
