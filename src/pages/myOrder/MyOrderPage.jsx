import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
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

const MyOrderPage = () => {

	
	const [purchase, setPurchase] = useState([]);
	const [userUpdatedPurchase, setUserUpdatedpurchase] = useState([]);
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios
			.get(
				`http://localhost:5000/purchase?email=${user?.email}`
			)
			.then((res) => {
				console.log(res.data)
				setPurchase(res.data);
				setUserUpdatedpurchase(res.data);
				setLoading(false);
			});
	}, [user]);

	const onDelete = (prop) => {
		const remaining = purchase.filter((item) => item._id !== prop);
		setUserUpdatedpurchase([...remaining]);
	};

	const handleDelete = (id) => {
		axios
			.delete(`https://globalpalate-a11-server.vercel.app/purchase/${id}`)
			.then((res) => {
				console.log(res.data);
				if (res.data.deletedCount > 0) {
					toast.success("successfully Deleted from the database");
					onDelete(id);
				}
			})
			.catch((error) => console.log(error.message));
	};

	return (
		<div>
			<Helmet>
				<title>GlobalPalate | My Order</title>
			</Helmet>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="right">
								<h1 className="font-bold text-lg">Serial</h1>
							</TableCell>
							<TableCell align="right">
								<h1 className="font-bold text-lg">Name</h1>
							</TableCell>
							<TableCell align="right">
								<h1 className="font-bold text-lg">
									Buying Date
								</h1>
							</TableCell>
							<TableCell align="right">
								<h1 className="font-bold text-lg">Price</h1>
							</TableCell>
							<TableCell align="right">
								<h1 className="font-bold text-lg">Quantity</h1>
							</TableCell>

							<TableCell align="right">
								<h1 className="font-bold text-lg">Delete</h1>
							</TableCell>
						</TableRow>
					</TableHead>
					{loading ? (
						<div className="w-full mx-auto px-96">
							<span className="loading loading-bars loading-lg"></span>
						</div>
					) : (
						<TableBody>
							{userUpdatedPurchase.map((row) => (
								<TableRow
									key={row._id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell align="right">{1}</TableCell>
									<TableCell align="right">
										{row?.foodName}
									</TableCell>
									<TableCell align="right">
										{row?.buyingTime}
									</TableCell>
									<TableCell align="right">
										${row.price}
									</TableCell>
									<TableCell align="right">
										{row.quantity}
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
													Are You sure You want to
													Delete?
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
							))}
						</TableBody>
					)}
				</Table>
			</TableContainer>
		</div>
	);
};

export default MyOrderPage;
