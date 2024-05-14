import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../utils/firebase.config";
import { toast } from "react-toastify";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem("authUser");
		return savedUser ? JSON.parse(savedUser) : null;
	});
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const signInUser = (email, password) => {
		setLoading(false);
		return signInWithEmailAndPassword(auth, email, password);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
			const userEmail = currentUser?.email || user?.email;
			const loggedUser = { email: userEmail };
			if (currentUser) {
				localStorage.setItem("authUser", JSON.stringify(currentUser));
				setUser(currentUser);
				setLoading(false);

				await axios
					.post(
						"https://globalpalate-a11-server.vercel.app/jwt",
						loggedUser,
						{ withCredentials: true }
					)
					.then((res) => console.log("token response", res.data))
					.catch((error) => console.error(error.message));
			} else {
				localStorage.removeItem("authUser");
				setUser(null);
				await axios
					.post(
						`https://globalpalate-a11-server.vercel.app/logout`,
						loggedUser,
						{ withCredentials: true }
					)
					.then((res) => console.log(res.data))
					.catch((error) => console.error(error.message));
			}
			console.log("observing", currentUser);
		});
		return () => unsubscribe();
	}, []);

	const handleSignOut = async () => {
		setLoading(true);
		
		await signOut(auth)
			.then(() => {
				toast.success("Successfully logged out");

				localStorage.removeItem("authUser");
				setUser(null);
			})
			.catch((error) => {
				console.error(error);
				toast.error("Failed to log out");
			});
	};

	const authInfo = { user, loading, setLoading, setUser, createUser, signInUser, handleSignOut };

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
