"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Link from "next/link";


export default function SignUpPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [middleName, setMiddleName] = useState	("");
	const router = useRouter();

	const handleLogin = async (e: React.SubmitEvent) => {
		e.preventDefault();
		setError("");

		try {
			const response = await api.post("/auth/login", {email, password});
			const token = response.data.token;
			localStorage.setItem("token", token);
			router.push("/dashboard")
		} catch (err: any) {
			console.error(err.message);
			setError(err.response?.data?.message || "Login failed");
		}
	}

	return (
		<div className="login-section">
			<h1 className="purple-text">AI FINTECH APP</h1>
			{error && (<p className="text-red">{error}</p>)}
			<div className="signup-card">
				<form onSubmit={handleLogin}>
					<div className="first-name-box">
						<label htmlFor="first-name">First Name</label>
						<input
							id="first-name"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="First Name"
							required
						/>
					</div>
					<div className="middle-name-box">
						<label htmlFor="middle-name">Middle Name</label>
						<input
							id="middle-name"
							type="text"
							value={middleName}
							onChange={(e) => setMiddleName(e.target.value)}
							placeholder="Optional"
						/>
					</div>
					<div className="last-name-box">
						<label htmlFor="last-name">Last Name</label>
						<input
							id="last-name"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Last Name"
							required
						/>
					</div>
					<div className="email-box">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="name@email.com"
							required
							className="signup-email"
						/>
					</div>
					<div className="password-box">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="*****"
							required
							className="sign-password"
						/>
					</div>
					<div className="btn-box">
						<button
							type="submit"
							className="signup-btn"
						>Sign up</button>
					</div>
				</form>
				<p>Already have an account?{" "}
					<Link href="/login" className="login-page">
					Login
					</Link>
				</p>
			</div>
		</div>
	);
}

// NOTE u can use <link /> drom next/link in place of <a />