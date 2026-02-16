"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPwd, setShowPwd] = useState(false);
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
			<div className="login-card">
				<form onSubmit={handleLogin}>
					<div className="login-box">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="name@email.com"
							required
							className="login-email"
						/>
					</div>
					<div className="password-box">
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type={showPwd ? "text" : "password"}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="*****"
							required
							className="login-password"
						/>
						<button
							type="button" // important! set to buuton so i doesnt submit the form
							onClick={() => setShowPwd(!showPwd)}
							className="show-password-btn"	
						>
							{showPwd ? "Hide" : "Show"}
						</button>
					</div>
					<div className="btn-box">
						<button
							type="submit"
							className="login-btn"
						>Login</button>
					</div>
				</form>
				<p>Don't have an account?{" "}
					<a href="/signup" className="signup-page">
					Sign up
					</a>
				</p>
			</div>
		</div>
	);
}

// NOTE u can use <link /> drom next/link in place of <a />