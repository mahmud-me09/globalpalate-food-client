import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../utils/firebase.config";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../providers/AuthProvider";
import sideImg from "../../assets/loginPage.svg";
import axios from "axios";

const LoginPage = () => {
	const navigate = useNavigate();
	const googleProvider = new GoogleAuthProvider();
	googleProvider.addScope("email");
	const githubProvider = new GithubAuthProvider();

	const [showPassword, setShowPassword] = useState(false);
	const { signInUser } = useContext(AuthContext);
	const location = useLocation();
	const { from } = location.state || { from: { pathname: "/" } }; // Default to homepage if no previous location

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;

		signInUser(email, password)
			.then((result) => {
				// Signed in
				const user = result.user;
				axios
					.post(
						`https://globalpalate-a11-server.vercel.app/jwt`,
						{ email: user?.email },
						{ withCredentials: true }
					)
					.then((res) => console.log(res.data));
				toast.success("Logged in Successfully");
				navigate(from); // Redirect to previous page
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				toast.error("email or password do not match");
			});
	};

	const handleGoogleLogin = () => {
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				const user = result?.user;
				axios
					.post(
						`https://globalpalate-a11-server.vercel.app/jwt`,
						{ email: user?.email },
						{ withCredentials: true }
					)
					.then((res) => console.log(res.data));
				toast.success("Logged in Successfully");
				navigate(from); // Redirect to previous page
			})
			.catch((error) => {
				console.log(error.message);
				toast.error(error.message);
			});
	};

	return (
		<>
			<Helmet>
				<title>Global Palate | Login</title>
			</Helmet>
			<div className="flex items-center justify-between px-20">
				<div className="hidden md:flex  justify-center h-96">
					<img src={sideImg} alt="Restaurant" />
				</div>
				<div className="w-full mx-auto my-5 max-w-md p-4 rounded-md shadow sm:p-8 border border-green-200">
					<h2 className="mb-3 text-3xl font-semibold text-center">
						Login to your account
					</h2>
					<p className="text-sm text-center dark:text-gray-600">
						Don't have account?
						<Link
							to="/registration"
							className=" text-blue-600 focus:underline hover:underline"
						>
							Sign up here
						</Link>
					</p>
					<div className="my-6 space-y-4">
						<button
							onClick={handleGoogleLogin}
							aria-label="Login with Google"
							type="button"
							className="flex btn btn-outline btn-success items-center justify-center w-full p-4 space-x-4 border rounded-md"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 32 32"
								className="w-5 h-5 fill-current"
							>
								<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
							</svg>
							<p>Login with Google</p>
						</button>
					</div>
					<div className="flex items-center w-full my-4">
						<hr className="w-full text-green-600" />
						<p className="px-3 text-green-600">OR</p>
						<hr className="w-full text-green-600" />
					</div>
					<form
						onSubmit={handleSubmit}
						type="submit"
						noValidate=""
						action=""
						className="space-y-8"
					>
						<div className="space-y-4">
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="block text-sm"
								>
									Email address
								</label>
								<input
									type="email"
									name="email"
									id="email"
									placeholder="leroy@jenkins.com"
									className="w-full px-3 py-2 border rounded-md border-green-300 text-gray-800 focus:border-green-800"
								/>
							</div>
							<div className="space-y-2">
								<div className="flex justify-between">
									<label
										htmlFor="password"
										className="text-sm"
									>
										Password
									</label>
									<a
										rel="noopener noreferrer"
										href="#"
										className="text-xs hover:underline dark:text-gray-600"
									>
										Forgot password?
									</a>
								</div>

								<div className="relative">
									<input
										type={
											showPassword ? "text" : "password"
										}
										name="password"
										id="password"
										placeholder="*****"
										className="w-full px-3 py-2 border rounded-md border-green-300 text-gray-800 focus:border-green-800"
									/>
									<div
										onClick={handleShowPassword}
										className="absolute bottom-3 right-4"
									>
										{showPassword ? (
											<FaEye />
										) : (
											<FaEyeSlash />
										)}
									</div>
								</div>
							</div>
						</div>
						<button
							type="submit"
							className="w-full px-8 py-3 font-semibold rounded-m bg-green-600 rounded-lg text-white"
						>
							Sign in
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default LoginPage;
