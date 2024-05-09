import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Root = () => {
	return (
		<HelmetProvider>
			<div className="max-w-[1320px] mx-auto">
                <NavBar></NavBar>
				<Outlet></Outlet>
                <Footer></Footer>
				<ToastContainer />
			</div>
		</HelmetProvider>
	);
};

export default Root;
