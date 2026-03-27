"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleLogin = async (e: React.SubmitEvent) => {
		e.preventDefault();
		setError("");
    setLoading(true);

		try {
			const response = await api.post("/auth/login", {email, password});
			const token = response.data.token;
			const userId = response.data.user.id as string;
			localStorage.setItem("token", token);
			localStorage.setItem("userId", userId);
			router.push("/dashboard")
		} catch (err: any) {
			console.error(err.message);
			setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
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
              disabled={ loading }
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
              disabled={ loading }
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
              disabled={ loading }
							className="login-btn"
						>
              { loading ? "Login you in..." : "Login" }
            </button>
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

// NOTE u can use <link /> from next/link in place of <a />
