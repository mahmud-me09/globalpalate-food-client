import React from 'react';

const HeadingSection = ({h1, p}) => {
    return (
		<div className="my-10 text-center">
			<h1 className=" text-lg md:text-2xl my-4 lg:text-4xl w-fit mx-auto p-5 border-t-8 border-green-700 rounded-lg bg-green-50 border shadow-green-200 shadow-lg font-bold">
				{h1}
			</h1>
			<p className="w-3/5 mt-6 text-base lg:text-lg mx-auto">
				{p}
			</p>
		</div>
	);
};

export default HeadingSection;