"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import api from "@/lib/api";
import ProtectedRoute from "@/components/protectedRoutes";
import Link from "next/link";

export default function Dashboard() {
	const router = useRouter();
	const [user, setUser] = useState<{
    email: string,
    firstName: string,
    middleName?: string
    lastName: string,
    isNewUser: boolean,
  } | null>(null);
  const searchParams = useSearchParams();
  const isFirstTime = searchParams.get("firstTime") === "true";

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			router.push("/login");
			return;
		}

		const fetchUser =  async () => {
			try {
				const res = await api.get("/user/profile");
        const userData = res.data;
				setUser(userData);

        // Do something only first time usets can see then age the user
        if (userData.isNewUser) {
          // doSomethingForNewUsers();
          const uptdRes = await api.post("/user/profile/set-old", { isNewUser: false });
          setUser(uptdRes.data);
        }
      } catch (err) {
				router.push("/login");
			}
    }

		fetchUser();
  }, [router]); // use effect runs as many times as router changes

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
				Welcome { isFirstTime ? "" : "Back " }
				{user?.firstName}{" "}
				{user?.middleName ? user.middleName + " " : ""}
				{user?.lastName}
				</h2>
				<button
				className="logout-btn"
				onClick={handleLogout}>
					Logout
				</button>{" "}
        <button                                     type="button"
          className="trans-btn"                    >
            <Link href="/dashboard/transaction">
              Add Transaction
            </Link>
          </button>{" "}
          <button                                   type="button"
          className="cancel-btn"                    >                                         <Link href="/dashboard/fund">                                                       Add Fund
            </Link>
        </button>{" "}
        <button
          type="button"
          className="chat-btn"
        >
          <Link href="/dashboard/chat">
              Chat with Ambrose
          </Link>
        </button>{" "}
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
