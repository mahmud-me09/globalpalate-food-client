import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import banner from "../../assets/AddFoodBanner.jpg";
import axios from "axios";
import AllFoodPageCard from "./AllFoodPageCard";
import { useParams } from "react-router-dom";

const AllFoodPage = () => {
	const [foods, setFoods] = useState([]);
    const [search, setSearch] =useState('')
	useEffect(() => {
		axios
			.get("./data.json")
			.then((res) => setFoods(res.data))
			.catch((error) => console.log(error));
	}, [search]);
	const onSubmit = (event) => {
		event.preventDefault();
		const name = event.target.name.value;
		setSearch(name);
        console.log(name)
	};
	return (
		<div>
			<Helmet>
				<title>GlobalPalate | All Food</title>
			</Helmet>
			<div>
				<div className="relative before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-black before:opacity-60 mb-20">
					<img className="w-full md:h-[371px]" src={banner} alt="Banner" />
					<div className="absolute text-center font-bold text-white z-10 top-[20%] lg:top-[45%] right-[35%]">
						<h1 className="text-lg lg:text-5xl">
							All Foods Section
						</h1>
						<p className="md:py-5">
							<span className="text-green-200">
								Global Palate
							</span>{" "}
							| All Foods
						</p>
					</div>
				</div>
			</div>
			{/* search */}
			<form onSubmit={onSubmit}>
				<fieldset className=" mx-auto space-y-1 border border-green-700 rounded-lg  w-fit text-green-700">
					<label htmlFor="Search" className="hidden">
						Search
					</label>
					<div className="relative">
						<span className="absolute inset-y-0 left-0 flex items-center pl-2">
							<button
                                
								type="submit"
								title="search"
								className="p-1 focus:outline-none focus:ring"
							>
								<svg
									fill="currentColor"
									viewBox="0 0 512 512"
									className="w-4 h-4 dark:text-gray-800"
								>
									<path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
								</svg>
							</button>
						</span>
						<input
							type="name"
							name="name"
							placeholder="Search..."
							className="w-fit py-3 border  pl-10 text-sm rounded-md focus:outline-none dark:bg-gray-100 dark:text-gray-800 focus:dark:bg-gray-50 focus:dark:border-violet-600"
						/>
					</div>
				</fieldset>
			</form>
			{/* food */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center md:justify-between mx-auto gap-14 p-20">
				{foods.map((food) => (
					<AllFoodPageCard
						key={food.name}
						food={food}
					></AllFoodPageCard>
				))}
			</div>
		</div>
	);
};

export default AllFoodPage;
