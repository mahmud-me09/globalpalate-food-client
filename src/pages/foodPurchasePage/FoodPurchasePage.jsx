import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import HeadingSection from "../home/HeadingSection";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const FoodPurchasePage = () => {
	const { user } = useContext(AuthContext);
	const [food, setFood] = useState([]);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get(`https://globalpalate-a11-server.vercel.app/foods/${id}`)
			.then((res) => {
				setFood(res.data);
				setLoading(false);
			});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (user.email !== food.add_by.email) {
			const form = event.target;
			const foodName = form.foodName.value;
			const category = form.category.value;
			const quantity = form.quantity.value;
			const price = form.price.value;
			const buyingTime = new Date().toISOString().split("T")[0];
			const buyer = { userName: user.displayName, email: user.email };

			const formData = {
				foodName,
				category,
				quantity,
				price,
				buyer,
				buyingTime,
			};
			console.log(formData);
			axios
				.post(
					"https://globalpalate-a11-server.vercel.app/purchase",
					formData
				)
				.then((res) => {
					console.log(res);
					if (res.data.insertedId) {
						form.reset();
						axios
							.patch(
								`https://globalpalate-a11-server.vercel.app/foods/${id}`,
								{ $inc: { purchaseCount: 1 } }
							)
							.then((res) => console.log(res.data));
						toast.success("successfully added to the cart");
						navigate("/myorder");
					}
				})
				.catch((error) => console.log(error.message));
		} else {
			toast.error("You are the maker!!! You cannot purchase");
			navigate("/allfood");
		}
	};
	return (
		<div>
			<Helmet>
				<title>GlobalPalate | Food Purchase</title>
			</Helmet>
			{loading ? (
				<div className="flex justify-center relative p-10 ">
					<div className="flex flex-col gap-4 w-52">
						<div className="skeleton h-32 w-full"></div>
						<div className="skeleton h-4 w-28"></div>
						<div className="skeleton h-4 w-full"></div>
						<div className="skeleton h-4 w-full"></div>
					</div>
				</div>
			) : (
				<form onSubmit={handleSubmit}>
					<HeadingSection
						h1={"Purchase Here"}
						p={""}
					></HeadingSection>
					<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 border-l w-full md:w-1/2 mx-auto border border-green-600 border-dashed bg-amber-50 p-10 pl-4">
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="foodName" className="text-sm">
								Food name:
							</label>
							<input
								name="foodName"
								type="text"
								placeholder="Food Name"
								defaultValue={food.name}
								readOnly
								className="w-full rounded-md p-4 border border-green-300"
							/>
						</div>
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="category" className="text-sm">
								Food Category:
							</label>
							<input
								name="category"
								type="text"
								placeholder="Food Category"
								defaultValue={food.category}
								readOnly
								className="w-full rounded-md p-4 border border-green-300"
							/>
						</div>

						<div className="col-span-full sm:col-span-3">
							<label htmlFor="Quantity" className="text-sm">
								Purchase Quantity:
							</label>
							<input
								name="quantity"
								type="number"
								defaultValue={1}
								max={food.quantity}
								min={1}
								placeholder="Quantity"
								className="w-full rounded-md p-4 border border-green-300"
							/>
						</div>
						<div className="col-span-full sm:col-span-3">
							<label htmlFor="Price" className="text-sm">
								Price:
							</label>
							<input
								name="price"
								type="text"
								placeholder="Price"
								readOnly
								defaultValue={food.price}
								className="w-full rounded-md p-4 border border-green-300"
							/>
						</div>

						<div className="col-span-full sm:col-span-3">
							<label htmlFor="userName" className="text-sm">
								User name:
							</label>
							<input
								name="userName"
								type="text"
								defaultValue={user?.displayName}
								readOnly
								placeholder="User Name"
								className="w-full rounded-md p-4 border border-green-300"
							/>
						</div>
						<div className="col-span-full sm:col-span-3 mb-4">
							<label htmlFor="email" className="text-sm">
								User Email:
							</label>
							<input
								name="email"
								type="text"
								defaultValue={user?.email}
								readOnly
								placeholder="User Email"
								className="w-full rounded-md p-4 border border-green-300"
							/>
						</div>
						<label
							htmlFor={`my_modal_submit`}
							className="btn btn-success col-span-full"
						>
							Submit
						</label>

						<input
							type="checkbox"
							id={`my_modal_submit`}
							className="modal-toggle"
						/>
						<div className="modal" role="dialog">
							<div className="modal-box">
								<h3 className=" text-center font-bold text-lg">
									Hello {user?.displayName}!
								</h3>
								<p className="py-4 text-center">
									Are You sure You want to Add this Food to
									your food cart?
								</p>
								<div className="modal-action justify-between">
									<input
										value="confirm"
										type="submit"
										className="btn btn-error w-1/2"
									/>

									<label
										htmlFor={`my_modal_submit`}
										className="btn btn-success w-1/2"
									>
										Exit!
									</label>
								</div>
							</div>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default FoodPurchasePage;
