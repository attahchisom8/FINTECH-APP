"use client"

import { useState } from "react"
import api from "@/lib/api";
import ProtectedRoute from "@/components/protectedRoutes";
import Link from "next/link";

export default function TransactionPage() {
	const [amount, setAmount] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		setError("");

		try {
			setLoading(true);

			const res = await api.post("/ai/transactions", {
				amount: Number(amount),
				description
			});
			setCategory(res.data.category);
      console.log(category);
			setLoading(false);
		} catch (err: any) {
			const errMsg = err.response?.data?.message || err.message || "Transaction Error";
      setError(errMsg);
		} finally {
			setLoading(false);
		}
	}

	return (
    <ProtectedRoute>
		  <div className="trans-page">
        <header className="trans-header">
          <button                                   type="button"
          className="cancel-btn"                    >                                         <Link href="/dashboard">
              Cancel
            </Link>                               </button>
        </header>
        <h2 className="text-title">Transactions</h2>
        <div className="box-err">
          {error && <p className="text-red">{error}</p>}
        </div>
        <div className="input-section">
          <form onSubmit={ handleSubmit }>
            <input
              type="number"
              placeholder="amount"
              value={ amount }
              required
              onChange={(e) => setAmount(e.target.value)}
              className="inp-amount"
            />
            <input
              type="text"
              placeholder="description"
              value={ description }
              onChange={ (e) => setDescription(e.target.value) }
              required
              className="inp-description"
            />
            <button
              type="submit"
              className="submit-btn"
              disabled={ loading }
              >
              { loading ? "Processing...": "Submit" }
              </button>
          </form>
        </div>
        { category && ( <p className="text-category">{ category }</p> )}
		  </div>
    </ProtectedRoute>
	)
}
