import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import axios from "axios";

const MyAddedFoodPage = () => {
	const navigate = useNavigate();
	const [foods, setFoods] = useState([]);
	const [userUpdatedfoods, setUserUpdatedfoods] = useState([]);
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(
				`https://globalpalate-a11-server.vercel.app/food/${user?.email}`,
				{
					withCredentials: true,
				}
			)
			.then((res) => {
				setFoods(res.data);
				setUserUpdatedfoods(res.data);
				setLoading(false);
			});
	}, [user?.email]);

	const onDelete = (id) => {
		const remaining = foods.filter((food) => food._id !== id);
		setFoods([...remaining]);
		setUserUpdatedfoods([...remaining]);
	};

	const handleDelete = (id) => {
		axios
			.delete(`https://globalpalate-a11-server.vercel.app/foods/${id}`, {withCredentials:true})
			.then((res) => {
				console.log(res.data);
				if (res.data.deletedCount > 0) {
					toast.success("Successfully deleted from the database");
					onDelete(id);
				}
			})
			.catch((error) => console.log(error.message));
	};

	return (
		<>
			<Helmet>
				<title>Global Palate | My Added Foods</title>
			</Helmet>
			<div className="px-10 pt-20">
				<div className="flex gap-8 align-bottom justify-start pb-4">
					<h1 className="text-green-800 text-2xl font-bold">
						My Added Foods:
					</h1>{" "}
					<span className="badge badge-success text-white font-bold p-4">
						{" "}
						Total: {foods.length}
					</span>
				</div>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead className="bg-green-50">
							<TableRow>
								<TableCell>
									<h1 className="font-bold text-lg">
										Images
									</h1>
								</TableCell>
								<TableCell align="right">
									<h1 className="font-bold text-lg">Name</h1>
								</TableCell>
								<TableCell align="right">
									<h1 className="font-bold text-lg">
										Category
									</h1>
								</TableCell>
								<TableCell align="right">
									<h1 className="font-bold text-lg">Price</h1>
								</TableCell>
								<TableCell align="right">
									<h1 className="font-bold text-lg">
										Update
									</h1>
								</TableCell>
								<TableCell align="right">
									<h1 className="font-bold text-lg">
										Delete
									</h1>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{loading ? (
								<TableRow>
									<TableCell colSpan={6}>
										<div className="w-full mx-auto px-96">
											<span className="loading loading-bars loading-lg"></span>
										</div>
									</TableCell>
								</TableRow>
							) : (
								userUpdatedfoods.map((row) => (
									<TableRow key={row._id}>
										<TableCell component="th" scope="row">
											<img
												className="h-12 w-12"
												src={row.image}
												alt={row.name}
											/>
										</TableCell>
										<TableCell align="right">
											{row.name}
										</TableCell>
										<TableCell align="right">
											{row.category}
										</TableCell>
										<TableCell align="right">
											${row.price}
										</TableCell>
										<TableCell align="right">
											<label
												htmlFor={`my_modal_${row._id}`}
												className="btn my-4 text-black bg-green-500"
											>
												Update
											</label>
											<input
												type="checkbox"
												id={`my_modal_${row._id}`}
												className="modal-toggle"
											/>
											<div
												className="modal"
												role="dialog"
											>
												<div className="modal-box">
													<h3 className="text-center font-bold text-lg">
														Hello!{" "}
														{user.displayName}
													</h3>
													<p className="py-4 text-center">
														Are you sure you want to
														update?
													</p>
													<div className="modal-action justify-between">
														<label
															onClick={() =>
																navigate(
																	`/updatefood/${row._id}`
																)
															}
															className="btn btn-error w-1/2"
														>
															Confirm
														</label>
														<label
															htmlFor={`my_modal_${row._id}`}
															className="btn btn-success w-1/2"
														>
															Exit!
														</label>
													</div>
												</div>
											</div>
										</TableCell>
										<TableCell align="right">
											<label
												htmlFor={`modal_${row._id}`}
												className="btn my-4 text-black bg-red-500"
											>
												Delete
											</label>
											<input
												type="checkbox"
												id={`modal_${row._id}`}
												className="modal-toggle"
											/>
											<div
												className="modal"
												role="dialog"
											>
												<div className="modal-box">
													<h3 className="font-bold text-center text-lg">
														Hello!{" "}
														{user.displayName}
													</h3>
													<p className="py-4 text-center">
														Are you sure you want to
														delete?
													</p>
													<div className="modal-action">
														<label
															onClick={() =>
																handleDelete(
																	row._id
																)
															}
															htmlFor={`modal_${row._id}`}
															className="btn btn-error w-1/2"
														>
															Confirm
														</label>
														<label
															htmlFor={`modal_${row._id}`}
															className="btn btn-success w-1/2"
														>
															Exit!
														</label>
													</div>
												</div>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</>
	);
};

export default MyAddedFoodPage;
