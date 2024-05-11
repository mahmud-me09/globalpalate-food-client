import React from "react";
import { Helmet } from "react-helmet-async";
import banner from "../../assets/AllFoodBanner.jpg"

const GalleryPage = () => {
	return (
		<div>
			<Helmet>
				<title>GlobalPalate | Food Gallery</title>
			</Helmet>
			<div>
				<div className="relative before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-full before:w-full before:bg-black before:opacity-60 mb-20">
					<img className="w-full h-[371px] " src={banner} alt="Banner" />
					<div className="absolute text-center font-bold text-white z-10 top-[50%] right-[40%]">
						<h1 className="text-lg lg:text-5xl">
							Gallery
						</h1>
						<p className="py-5">
							<span className="text-green-200">
								Global Palate
							</span>{" "}
							| Gallery
						</p>
					</div>
				</div>
			</div>
			<section className="py-6 dark:bg-gray-100 dark:text-gray-900">
				<div className="container grid grid-cols-2 gap-4 mx-auto md:grid-cols-4">
					<img
						src="https://source.unsplash.com/random/301x301/"
						alt=""
						className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-3 md:row-start-1 dark:bg-gray-500 aspect-square"
					/>
					<img
						alt=""
						className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
						src="https://source.unsplash.com/random/200x200/?0"
					/>
					<img
						alt=""
						className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
						src="https://source.unsplash.com/random/200x200/?1"
					/>
					<img
						alt=""
						className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
						src="https://source.unsplash.com/random/200x200/?2"
					/>
					<img
						alt=""
						className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
						src="https://source.unsplash.com/random/200x200/?3"
					/>
					<img
						alt=""
						className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
						src="https://source.unsplash.com/random/200x200/?4"
					/>
					<img
						alt=""
						className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
						src="https://source.unsplash.com/random/200x200/?5"
					/>
					<img
						alt=""
						className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
						src="https://source.unsplash.com/random/200x200/?6"
					/>
					<img
						alt=""
						className="w-full h-full rounded shadow-sm min-h-48 dark:bg-gray-500 aspect-square"
						src="https://source.unsplash.com/random/200x200/?7"
					/>
					<img
						src="https://source.unsplash.com/random/302x302/"
						alt=""
						className="w-full h-full col-span-2 row-span-2 rounded shadow-sm min-h-96 md:col-start-1 md:row-start-3 dark:bg-gray-500 aspect-square"
					/>
				</div>
			</section>
		</div>
	);
};

export default GalleryPage;
