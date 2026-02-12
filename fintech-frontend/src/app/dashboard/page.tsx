"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ProtectedRoute from "@/components/protectedRoutes";

export default function Dashboard() {
	const router = useRouter();
	const [user, setUser] = useState<{
    email: string,
    firstName: string,
    middleName?: string
    lastName: string,
  } | null>(null);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/login");
			return;
		}

		const fetchUser =  async () => {
			try {
				const res = await api.get("/user/profile");
				setUser(res.data);
			} catch (err) {
				router.push("/login");
			}
		};

		fetchUser();
	}, [router]); // leaving the array empty i the same thing

	const handleLogout = () => {
		localStorage.removeItem("token");
		router.push("/login");
	}

	return (
		<ProtectedRoute>
			<div className="dash-page">
			<header className="dash-header">
				<h1>Dashboard</h1>
				<h2 className="text-green">
				Welcome Back
				{user?.firstName}{" "}
				{user?.middleName ? user.middleName + " " : ""}
				{user.lastName}
				</h2>
				<button
				className="logout-btn"
				onClick={handleLogout}>
					Logout
				</button>
			</header>
			<main>
				<section className="wallet-section">
					<h2>Wallet balance</h2>
					<p>N50, 000</p>
				</section>
				<section className="transaction-section">
					<h2>Recent Transactions</h2>
					<ul className="trans-list">
						<li>Sent N20,000 to Mr Smith</li>
						<li>Recieved N40, 000 from Silicy</li>
						<li>Deposited N100, 000</li>
					</ul>
				</section>

				{/* AI Section */}
				<section className="ai-section">
					<h2>AI insight</h2>
					<p>Your spending increased 10% this week consider budgeting</p>
				</section>
			</main>
			</div>
		</ProtectedRoute>
	);
}
