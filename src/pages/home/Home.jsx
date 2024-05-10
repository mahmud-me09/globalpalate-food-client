import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import FoodsSection from './FoodsSection';

import FindUs from './FindUs';
import HeadingSection from './HeadingSection';
import OurServices from './OurServices';

const Home = () => {
    return (
		<>
			<Helmet>
				<title>GlobalPalate | Home </title>
			</Helmet>
			<Banner></Banner>
			<HeadingSection
				h1={"Discover Our Top Foods"}
				p={
					"Indulge your taste buds with our curated selection of top foods from around the globe. From mouthwatering appetizers to decadent desserts, each dish is crafted with the finest ingredients and expert culinary techniques to deliver an unforgettable dining experience."
				}
			></HeadingSection>
			<div className="p-10">
				<FoodsSection></FoodsSection>
			</div>
			<HeadingSection
				h1={"Where to Find Us"}
				p={
					"Visit us at our locations listed below and indulge in a delightful dining experience. Our friendly staff awaits to serve you!"
				}
			></HeadingSection>
			<FindUs></FindUs>
			<HeadingSection
				h1={"Our Specialty"}
				p={
					"Indulge in our exquisite specialties crafted with passion and precision. From signature dishes bursting with flavor to innovative creations that tantalize the taste buds, each dish is a testament to our commitment to culinary excellence."
				}
			></HeadingSection>
			<OurServices></OurServices>
		</>
	);
};

export default Home;