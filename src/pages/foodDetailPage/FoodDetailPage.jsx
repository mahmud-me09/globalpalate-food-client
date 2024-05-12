import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const FoodDetailPage = () => {
	const { id } = useParams();
	const [food, setFood] = useState([]);
	const [loading, setLoading] = useState(true);
	console.log(loading);
	useEffect(() => {
		axios
			.get(`https://globalpalate-a11-server.vercel.app/foods/${id}`)
			.then((res) => {
				setFood(res.data);
				setLoading(false);
			});
	}, []);

	return (
		<div>
			<Helmet>
				<title>GlobalPalate | Food Detail</title>
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
				<div className="hero max-h-screen">
					<div className="hero-content flex-col lg:flex-row-reverse relative">
						<img
							src={food?.image}
							className="w-1/2 rounded-lg shadow-2xl"
						/>
						<div>
							<h1 className="text-xl md:text-5xl font-bold text-center">
								{food.name}{" "}
								<small className="text-lg">
									({food?.category})
								</small>
							</h1>
							<p className="py-6">{food?.description}</p>
							<ul className="list-disc pl-5">
								<li>Price: ${food?.price}</li>
								<li>Made By: {food?.add_by?.userName}</li>
								<li>Food Origin: {food?.origin}</li>
							</ul>
							<div className="flex justify-center pt-10">
								<button className="btn btn-outline btn-success ">
									Purchase Now!
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default FoodDetailPage;
