import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import banner from "../../assets/AllFoodBanner.jpg";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GalleryPage = () => {
	const [feedback, setFeedback] = useState([]);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const from = location.pathname;
	console.log(from)

	useEffect(() => {
		axios
			.get("https://globalpalate-a11-server.vercel.app/feedback")
			.then((res) => {
				setFeedback(res.data);
				setLoading(false);
			})
			.catch((error) => console.log(error.message));
	}, []);

	function handleSubmit(event) {
		// event.preventDefault();
		const form = event.target;
		const photoURL = form.photoURL.value;
		const feedback = form.feedback.value;
		const formData = { user: user.displayName, photoURL, feedback };
		console.log(formData);
		axios
			.post(
				"https://globalpalate-a11-server.vercel.app/feedback",
				formData
			)
			.then((res) => {
				console.log(res);
				if (res.data.insertedId) {
					toast.success("Your Feedback has been accepted!");
					form.reset();
				}
			})
			.catch((error) => console.log(error.message));
	}

	return (
		<div>
			<Helmet>
				<title>GlobalPalate | Food Gallery</title>
			</Helmet>
			<div>
				<div className="relative before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-black before:opacity-60 mb-20">
					<img
						className="w-full h-[371px]"
						src={banner}
						alt="Banner"
					/>
					<div className="absolute text-center font-bold text-white z-10 top-[50%] right-[40%]">
						<h1 className="text-lg lg:text-5xl">Gallery</h1>
						<p className="py-5">
							<span className="text-green-200">
								Global Palate
							</span>{" "}
							| Gallery
						</p>
					</div>
				</div>
			</div>
			<div>
				{/* Open the modal using document.getElementById('ID').showModal() method */}
				<button
					className="btn btn-outline btn-success relative left-[30%] lg:left-[45%]"
					onClick={() =>
						user
							? document.getElementById("my_modal_5").showModal()
							: navigate("/login", {
									state: { from: location.pathname },
							  })
					}
				>
					Add Images and Feedback
				</button>
				<dialog
					id="my_modal_5"
					className="modal modal-bottom sm:modal-middle"
				>
					<div className="modal-box">
						<h3 className="font-bold text-xl text-center">
							Hello, Mr. {user?.displayName}!
						</h3>
						<h3 className="font-bold text-lg text-center">
							Please Add Your Review Here.
						</h3>

						<div className="modal-action justify-center">
							<form onSubmit={handleSubmit} method="dialog">
								<div className="flex flex-col gap-4 center">
									<div className="flex flex-col">
										<label
											htmlFor="userName"
											className="text-base"
										>
											User's Name:
										</label>
										<input
											className="p-4 border border-green-300 rounded-lg"
											type="text"
											placeholder="User Name"
											name="userName"
											defaultValue={user?.displayName}
											readOnly
										/>
									</div>
									<div className="flex flex-col">
										<label
											htmlFor="photoURL"
											className="text-base"
										>
											PhotoURL:
										</label>
										<input
											className="p-4 border border-green-300 rounded-lg"
											type="text"
											placeholder="Paste Image URL Here"
											name="photoURL"
										/>
									</div>
									<div className="flex flex-col">
										<label
											htmlFor="deedback"
											className="text-base"
										>
											Feedback:
										</label>
										<input
											className="p-4 border border-green-300 rounded-lg"
											type="text"
											placeholder="Your Feedback"
											name="feedback"
										/>
									</div>
								</div>
								{/* if there is a button in form, it will close the modal */}

								<button className="btn mt-6 ">Add</button>
							</form>
						</div>
					</div>
				</dialog>
			</div>
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
				<section className="py-6 dark:bg-gray-100 dark:text-gray-900">
					<div className="container grid grid-cols-2 gap-4 mx-auto md:grid-cols-4">
						{feedback.map((food) => (
							<div key={food._id} className="relative mb-20">
								<div className="relative w-full h-full">
									<img
										alt=""
										className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
										src={food.photoURL}
									/>
									<div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black bg-opacity-60 transition-opacity duration-300">
										<div className="text-center">
											<h1 className="text-lg text-white">
												{food.user}
											</h1>
											<p className="text-white">
												{food.feedback}
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			)}
		</div>
	);
};

export default GalleryPage;
