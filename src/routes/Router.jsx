import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import PrivateRouter from "./PrivateRouter";
import Home from "../pages/home/Home";
import Error from "../pages/error/Error";
import AllFoodPage from "../pages/allFoodPage/AllFoodPage";
import FoodDetailPage from "../pages/foodDetailPage/FoodDetailPage";
import FoodPurchasePage from "../pages/foodPurchasePage/FoodPurchasePage"
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
					element: (
						<PrivateRouter>
							<MyAddedFoodPage></MyAddedFoodPage>
						</PrivateRouter>
					),
				},
				{
					path: "/addfood",
					element: (
						<PrivateRouter>
							<AddFoodPage></AddFoodPage>
						</PrivateRouter>
					),
				},
				{
					path: "/myorder",
					element: (
						<PrivateRouter>
							<MyOrderPage></MyOrderPage>
						</PrivateRouter>
					),
				},
				{
					path: "/updatefood/:id",
					element: (
						<PrivateRouter>
							<UpdateFoodPage></UpdateFoodPage>
						</PrivateRouter>
					),
				},
				{
					path: "/foodpurchase/:id",
					element: (
						<PrivateRouter>
							<FoodPurchasePage></FoodPurchasePage>
						</PrivateRouter>
					),
				},
			],
		},
	]);

	return <RouterProvider router={router} />;
};

export default Router;
