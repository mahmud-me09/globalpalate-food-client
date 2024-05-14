import { Link, NavLink } from "react-router-dom";
import favicon from "../assets/favicon.svg";
import { FaHome } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { GrGallery } from "react-icons/gr";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const NavBar = () => {
	const { user, handleSignOut } = useContext(AuthContext)
	const [currentUser, setCurrentUser] = useState(null)
	useEffect(()=>{
		axios.get(`https://globalpalate-a11-server.vercel.app/user?email=${user?.email}`)
		.then(res=>setCurrentUser(res.data));
	},[user])
	const navlinkItems = [
		{
			name: "Home",
			path: "/",
			icon: <FaHome className="text-green-600" />,
		},
		{
			name: "All Food",
			path: "/allfood",
			icon: <FaBowlFood className="text-green-600" />,
		},
		{
			name: "Gallery",
			path: "/gallery",
			icon: <GrGallery className="text-green-600" />,
		},
	];
	return (
		<div className="navbar bg-green-50 z-20 shadow-lg sticky top-0">
			<div className="navbar-start pl-10">
				<div className="dropdown">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost lg:hidden"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm gap-2 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
					>
						{navlinkItems.map((navlink) => (
							<li
								className="font-bold hover:bg-green-200 hover:text-white"
								key={navlink.name}
							>
								<NavLink
									className={({ isActive }) =>
										isActive
											? "bg-green-600  text-white "
											: "hover:bg-green-600 hover:text-white"
									}
									to={navlink.path}
								>
									{navlink.name}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				<Link className="flex flex-col hover:scale-110 transition-transform">
					<img className="h-8" src={favicon} alt="logo" />
					<p className=" text-xl font-bold">Global Palate</p>
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="flex flex-row gap-2 px-2">
					{navlinkItems.map((navlink) => (
						<li className="font-bold " key={navlink.name}>
							<NavLink
								className={({ isActive }) =>
									isActive
										? "bg-green-300 rounded-full  p-4 flex items-center gap-2 justify-center"
										: "p-4 rounded-full hover:bg-green-300  gap-2 flex items-center justify-center"
								}
								to={navlink.path}
							>
								<div>{navlink.icon}</div>
								<div>{navlink.name}</div>
							</NavLink>
						</li>
					))}
				</ul>
			</div>
			<div className="navbar-end pr-10">
				{user ? (
					<div className="dropdown dropdown-end">
						<div
							tabIndex={0}
							role="button"
							className="avatar btn btn-circle tooltip z-50 tooltip-left"
							data-tip={currentUser?.displayName || user.displayName}
						>
							<div className="w-10 rounded-full">
								<img
									alt="User Image"
									src={currentUser?.photoURL || user?.photoURL}
								/>
							</div>
						</div>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-52 font-bold"
						>
							<li>
								<Link
									to="/myaddedfoods"
									className="justify-between hover:bg-green-700 hover:text-white"
								>
									My Added Foods
								</Link>
							</li>
							<li>
								<Link
									to="/addfood"
									className="justify-between hover:bg-green-700 hover:text-white"
								>
									Add Food Item
								</Link>
							</li>
							<li>
								<Link
									to="/myorder"
									className="justify-between hover:bg-green-700 hover:text-white"
								>
									My Ordered Food
								</Link>
							</li>
							<li>
								<button
									onClick={handleSignOut}
									className="justify-between hover:bg-green-700 hover:text-white"
								>
									Logout
								</button>
							</li>
						</ul>
					</div>
				) : (
					<Link className="btn btn-outline btn-success" to="/login">
						Login
					</Link>
				)}
			</div>
		</div>
	);
};

export default NavBar;
