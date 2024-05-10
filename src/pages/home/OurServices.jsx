const OurServices = () => {
    return (
		<div className="grid px-20 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center md:justify-between mx-auto gap-8">
			<div className="card w-full h-[500px] border border-green-600 shadow-lg shadow-green-100 p-8 hover:scale-105">
				<div>
					<h1 className="text-center text-2xl font-bold text-green-700">
						Online or Offline Takeaway
					</h1>
				</div>
				<div className="w-full">
					<img
						src="https://images.ctfassets.net/h81st780aesh/5zzs56bvL3uolTDlhzjwdL/54e39d0ca6424b5c877567a7a66ee9ee/takeout_and_delivery.png?fm=webp&w=872&h=586&fit=fill&f=center&q=50"
						alt=""
					/>
				</div>
				<div>
					<p>
						Enjoy our delicious dishes from the comfort of your home
						with our convenient takeaway service. Order online or by
						phone and pick up your order at your preferred time.
					</p>
				</div>
			</div>
			<div className="card w-full h-[500px] border border-green-600 shadow-lg shadow-green-100 p-8 hover:scale-105">
				<div>
					<h1 className="text-center text-2xl font-bold text-green-700">
						Digital Payment
					</h1>
				</div>
				<div className="w-full">
					<img
						src="https://images.ctfassets.net/h81st780aesh/4vNSnf5OIW4927MnRNhnbi/3d7f70b206106325437b66ecb2d6339b/qr_code.png?fm=webp&w=872&h=586&fit=fill&f=center&q=50"
						alt=""
					/>
				</div>
				<div>
					<p>
						Experience hassle-free payments with our secure digital
						payment options. Pay for your meal conveniently using
						credit/debit cards, mobile wallets, or online banking.
					</p>
				</div>
			</div>
			<div className="card w-full h-[500px] border border-green-600 shadow-lg shadow-green-100 p-8 hover:scale-105">
				<div className="text-center text-2xl font-bold text-green-700">
					<h1>Online Catering</h1>
				</div>
				<div className="w-full">
					<img
						src="https://images.ctfassets.net/h81st780aesh/3qaRgB4l93ggEatGDarJTQ/8071891fcfeb31924a8bda06d33d10ea/online_catering.png?fm=webp&w=872&h=586&fit=fill&f=center&q=50"
						alt=""
					/>
				</div>
				<div>
					<p>
						Impress your guests with our delectable catering
						services for your special occasions. Choose from a
						variety of menu options and let us handle the rest.
					</p>
				</div>
			</div>
		</div>
	);
};

export default OurServices;