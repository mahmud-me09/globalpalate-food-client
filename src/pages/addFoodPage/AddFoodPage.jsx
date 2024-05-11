import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import { toast } from "react-toastify";

const AddFoodPage = () => {
	const { user } = useContext(AuthContext);

	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const image = form.image.value;
		const category = form.category.value;
		const price = form.price.value;
		const add_by = [user.displayName, user.email];
		const origin = form.origin.value;
		const quantity = form.quantity.value;
		const description = form.description.value;
		const formData = {
			name,
			image,
			category,
			price,
			add_by,
			origin,
			quantity,
			description,
		};
		console.log(formData);
		toast.success("successfully added");
	};
	console.log(user);

	return (
		<div>
			<Helmet>
				<title>GlobalPalate | Add Food</title>
			</Helmet>
			<section className="p-6 dark:bg-gray-100 dark:text-gray-900">
				<form
					onSubmit={handleSubmit}
					noValidate=""
					action=""
					className="container flex flex-col mx-auto space-y-12"
				>
					<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-50">
						<div className="space-y-2 col-span-full lg:col-span-1">
							<p className="text-xl">Add Food Here</p>
							<p className="text-md">
								Add food items here. The fields you have to
								enter is self explainatory. If there is a
								problem and query feel free to reach admin on{" "}
								<br />
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
										className="w-full rounded-md p-4 border border-green-300"
									/>
								</div>
								<div className="col-span-full sm:col-span-3">
									<label htmlFor="Price" className="text-sm">
										Price:
									</label>
									<input
										name="price"
										type="number"
										placeholder="Price"
										className="w-full rounded-md p-4 border border-green-300"
									/>
								</div>
							</div>
							<div class="col-span-full lg:col-span-3">
								<div class="col-span-full sm:col-span-3">
									<label for="Origin" class="text-sm">
										Food Origin:
									</label>
									<input
										name="origin"
										type="text"
										placeholder="Food Origin"
										class="w-full rounded-md p-4 border border-green-300"
									/>
								</div>
							</div>
							<div class="col-span-full">
								<div class="col-span-full sm:col-span-3">
									<label for="Image" class="text-sm">
										Food Image:
									</label>
									<input
										name="image"
										type="url"
										placeholder="Food Image"
										class="w-full rounded-md p-4 border border-green-300"
									/>
								</div>
							</div>
							<div class="col-span-full">
								<div class="col-span-full sm:col-span-3">
									<label for="Description" class="text-sm">
										Description:
									</label>
									<textarea
										name="description"
										type="url"
										placeholder="Food Description"
										class="w-full rounded-md h-40 p-4 border border-green-300"
									/>
								</div>
							</div>
							<div className="col-span-full sm:col-span-3">
								<label htmlFor="userName" className="text-sm">
									User name:
								</label>
								<input
									name="userName"
									type="text"
									defaultValue={user.displayName}
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
									defaultValue={user.email}
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
										Hello {user.displayName}!
									</h3>
									<p className="py-4 text-center">
										Are You sure You want to Add this Food
										to your food database?
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
		</div>
	);
};

export default AddFoodPage;
