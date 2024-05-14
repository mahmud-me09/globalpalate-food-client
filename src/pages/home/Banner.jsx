import { Link } from "react-router-dom";
import bannerImg from "../../assets/banner.jpg"

const Banner = () => {
    return (
		<div className="p-10 min-h-fit bg-green-50">
			<div className="flex gap-20 items-center justify-between flex-col lg:flex-row-reverse">
				<img
					src={bannerImg}
					className="w-full lg:max-w-2xl rounded-lg shadow-2xl"
				/>
				<div className="min-w-sm h-full p-8 md:rounded-lg lg:rounded-e-full border border-l-8 border-green-700">
					<h1 className="text-lg md:text-2xl lg:text-3xl font-bold leading-normal">
						Experience Global Flavors
						<br />
						In Global Palate
					</h1>
					<p className="py-6">
						Embark on a culinary journey around the world with our
						diverse selection of dishes inspired by global cuisines.
						From tantalizing spices of India to the savory flavors
						of Italy, indulge in a culinary adventure unlike any
						other.
					</p>
					<button className="btn btn-success btn-outline border">
						<Link to="/allfood">Get Started</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Banner;