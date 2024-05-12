import React from 'react';
import { Link } from 'react-router-dom';

const AllFoodPageCard = ({food}) => {
    const { _id, name, image, category, price, quantity } = food;
	return (
		<div className="card items-center w-full h-[620px] p-5 border border-green-600 shadow-xl">
			<h2 className="card-title justify-center my-4  w-fit border-green-700 hover:scale-150 hover:bg-green-400">
				{name}
			</h2>
			<figure className='relative'>
				<img className="h-72" src={image} alt="Shoes" />
				<figcaption className="badge badge-success absolute top-2 right-2 p-4 text-white font-bold">
					{category}
				</figcaption>
			</figure>

			<div className="card-body">
				<div className="card-actions justify-center">
					<div className="p-4 text-xl text-green-950 font-bold">
						Price: {price}
					</div>
				</div>
				<div className={`badge ${quantity>0?"badge-success":"badge-error"} p-5 font-bold`}>
					Available Qty: {quantity}
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

export default AllFoodPageCard;