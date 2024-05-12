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

	useEffect(() => {
		axios
			.get(
				`https://globalpalate-a11-server.vercel.app/foods?email=${user?.email}`
			)
			.then((res) => {
				setFoods(res.data);
				setUserUpdatedfoods(res.data);
			});
	}, [user]);

	const onDelete = (prop) => {
		const remaining = foods.filter((food) => food._id !== prop);
		setUserUpdatedfoods([...remaining]);
	};

	const handleDelete = (id) => {
		axios
			.delete(`https://globalpalate-a11-server.vercel.app/foods/${id}`)
			.then((res) => {
				console.log(res.data);
				if (res.data.deletedCount > 0) {
					toast.success("successfully Deleted from the database");
					onDelete(id);
				}
			})
			.catch((error) => console.log(error.message));
	};

	console.log(userUpdatedfoods);
	return (
		<>
			<Helmet>
				<title>Global Palate | My Added Foods</title>
			</Helmet>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>
								<h1 className="font-bold text-lg">Images</h1>
							</TableCell>
							<TableCell align="right">
								<h1 className="font-bold text-lg">Name</h1>
							</TableCell>
							<TableCell align="right">
								<h1 className="font-bold text-lg">Category</h1>
							</TableCell>
							<TableCell align="right">
								<h1 className="font-bold text-lg">Price</h1>
							</TableCell>
							<TableCell align="right">
								<h1 className="font-bold text-lg">Update</h1>
							</TableCell>
							<TableCell align="right">
								<h1 className="font-bold text-lg">Delete</h1>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{userUpdatedfoods.map((row) => (
							<TableRow
								key={row._id}
								sx={{
									"&:last-child td, &:last-child th": {
										border: 0,
									},
								}}
							>
								<TableCell component="th" scope="row">
									<img
										className="h-12 w-12"
										src={row.image}
										alt={row.name}
									/>
								</TableCell>
								<TableCell align="right">{row.name}</TableCell>
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
									<div className="modal" role="dialog">
										<div className="modal-box">
											<h3 className=" text-center font-bold text-lg">
												Hello! {user.displayName}
											</h3>
											<p className="py-4 text-center">
												Are You sure You want to Update?
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
									<div className="modal" role="dialog">
										<div className="modal-box">
											<h3 className="font-bold text-center text-lg">
												Hello! {user.displayName}
											</h3>
											<p className="py-4 text-center">
												Are You sure You want to Delete?
											</p>
											<div className="modal-action">
												<label
													onClick={() =>
														handleDelete(row._id)
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
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default MyAddedFoodPage;
