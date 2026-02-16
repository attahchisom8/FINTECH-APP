"use client";

import {useEffect } from "react";
import { useRouter, redirect } from "next/navigation";

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
	// const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token)
			return redirect("/login"); // or router.push("/login")
	}, []);

	return <>{children}</>
}

export default ProtectedRoute;