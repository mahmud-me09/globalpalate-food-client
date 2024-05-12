import axios from "axios";
import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { Link } from "react-router-dom";

const FoodsSection = () => {
	const [foods, setFoods] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios
			.get("https://globalpalate-a11-server.vercel.app/foods")
			.then((res) => {
				setFoods(res.data);
				setLoading(false);
			});
	}, []);
	return loading ? (
		<div className="flex justify-center relative p-10 ">
			<div className="flex flex-col gap-4 w-52">
				<div className="skeleton h-32 w-full"></div>
				<div className="skeleton h-4 w-28"></div>
				<div className="skeleton h-4 w-full"></div>
				<div className="skeleton h-4 w-full"></div>
			</div>
		</div>
	) : (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center md:justify-between mx-auto gap-14">
				{foods.slice(0, 6).map((food) => (
					<FoodCard key={food.name} food={food}></FoodCard>
				))}
			</div>
			<div className="flex justify-center my-10 mx-auto">
				<Link to="/allfood" className="btn btn-outline btn-success">
					See All Foods
				</Link>
			</div>
		</div>
	);
};

export default FoodsSection;
