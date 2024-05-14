import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateFoodPage = () => {
	const { user } = useContext(AuthContext);
	const [food, setFood] = useState([]);
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate()

	useEffect(() => {
		axios
			.get(`https://globalpalate-a11-server.vercel.app/foods/${id}`)
			.then((res) => {
				setFood(res.data);
				setLoading(false)
			})
			.catch(error=>console.log(error.message));
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const image = form.image.value;
		const category = form.category.value;
		const price = form.price.value;
		const purchaseCount = food?.purchaseCount
		const add_by = { userName: user.displayName, email: user.email };
		const origin = form.origin.value;
		const quantity = form.quantity.value;
		const description = form.description.value;
		const formData = {
			name,
			image,
			category,
			price,
			purchaseCount,
			add_by,
			origin,
			quantity,
			description,
		};
		console.log(formData);
		axios
			.put(
				`https://globalpalate-a11-server.vercel.app/foods/${id}`,
				formData
			)
			.then((res) => {
				console.log(res);
				if (res.data.modifiedCount > 0) {
					form.reset();
					toast.success("successfully Updated to the foodlist");
					navigate("/myaddedfoods");
					
				}
				else if(res.data.modifiedCount ===0 && res.data.matchedCount>0){
					form.reset()
					toast.error("Nothing to update.")
				}
			})
			.catch((error) => console.log(error.message));
	};

	return (
		<div>
			<Helmet>
				<title>GlobalPalate | Update Food</title>
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
				<section className="p-6 dark:bg-gray-100 dark:text-gray-900">
					<form
						onSubmit={handleSubmit}
						noValidate=""
						action=""
						className="container flex flex-col mx-auto space-y-12"
					>
						<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
							<div className="space-y-2 col-span-full lg:col-span-1">
								<p className="text-xl">Update Food Here</p>
								<p className="text-md">
									Update food items here. The fields you have
									to enter is self explainatory. If there is a
									problem and query feel free to reach admin
									on <br />
									Cell: +888484848416 <br /> Email:
									kdahkdshf@admin.com.
								</p>
							</div>
							<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3 border-l border-gray-100 pl-4">
								<div className="col-span-full sm:col-span-3">
									<label htmlFor="name" className="text-sm">
										Food name:
									</label>
									<input
										name="name"
										type="text"
										placeholder="Food Name"
										defaultValue={food.name}
										className="w-full rounded-md p-4 border border-green-300"
									/>
								</div>
								<div className="col-span-full sm:col-span-3">
									<label
										htmlFor="category"
										className="text-sm"
									>
										Food Category:
									</label>
									<input
										name="category"
										type="text"
										placeholder="Food Category"
										defaultValue={food.category}
										className="w-full rounded-md p-4 border border-green-300"
									/>
								</div>

								<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
									<div className="col-span-full sm:col-span-3">
										<label
											htmlFor="Quantity"
											className="text-sm"
										>
											Quantity:
										</label>
										<input
											name="quantity"
											type="number"
											placeholder="Quantity"
											defaultValue={food.quantity}
											className="w-full rounded-md p-4 border border-green-300"
										/>
									</div>
									<div className="col-span-full sm:col-span-3">
										<label
											htmlFor="Price"
											className="text-sm"
										>
											Price:
										</label>
										<input
											name="price"
											type="text"
											placeholder="Price"
											defaultValue={food.price}
											className="w-full rounded-md p-4 border border-green-300"
										/>
									</div>
								</div>
								<div className="col-span-full lg:col-span-3">
									<div className="col-span-full sm:col-span-3">
										<label
											htmlFor="Origin"
											className="text-sm"
										>
											Food Origin:
										</label>
										<input
											name="origin"
											type="text"
											placeholder="Food Origin"
											defaultValue={food.origin}
											className="w-full rounded-md p-4 border border-green-300"
										/>
									</div>
								</div>
								<div className="col-span-full">
									<div className="col-span-full sm:col-span-3">
										<label
											htmlFor="Image"
											className="text-sm"
										>
											Food Image:
										</label>
										<input
											name="image"
											type="url"
											placeholder="Food Image"
											defaultValue={food.image}
											className="w-full rounded-md p-4 border border-green-300"
										/>
									</div>
								</div>
								<div className="col-span-full">
									<div className="col-span-full sm:col-span-3">
										<label
											htmlFor="Description"
											className="text-sm"
										>
											Description:
										</label>
										<textarea
											name="description"
											type="url"
											placeholder="Food Description"
											defaultValue={food.description}
											className="w-full rounded-md h-40 p-4 border border-green-300"
										/>
									</div>
								</div>
								<div className="col-span-full sm:col-span-3">
									<label
										htmlFor="userName"
										className="text-sm"
									>
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
									className="btn btn-success btn-outline col-span-full"
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
											Are You sure You want to update this
											Food to your food database?
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
						</fieldset>
					</form>
				</section>
			)}
		</div>
	);
};

export default UpdateFoodPage;
