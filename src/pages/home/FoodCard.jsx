import React from "react";
import { Link } from "react-router-dom";


const FoodCard = ({ food }) => {
	const { _id, name, image, category, price } = food;
	return (
		<div
			className="card items-center w-full h-[576px] p-5 border border-green-600 shadow-xl"
		>
			<h2 className="card-title justify-center my-4  w-fit border-green-700 hover:scale-150 hover:bg-green-400">
				{name}
			</h2>
			<figure>
				<img className="h-72" src={image} alt="Shoes" />
				<figcaption className="badge badge-success p-4 text-white font-bold">
					{category}
				</figcaption>
			</figure>

			<div className="card-body">
				<div className="card-actions justify-center">
					<div className="p-4 text-xl text-green-950 font-bold">
						Price: {price}
					</div>
				</div>
				<div className="flex justify-center mt-5">
					<button className="btn btn-outline btn-success">
						<Link to={`/detailfood/${food._id}`}>See Detail</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default FoodCard;
