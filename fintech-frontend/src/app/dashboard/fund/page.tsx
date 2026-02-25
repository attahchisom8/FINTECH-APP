"use client"

import { useState } from "react";
import ProtectedRoute from "@/components/protectedRoutes";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";


export default function WallatFundingPage() {
  const [amount, setAmount] = useState("");
  const [balance, SetBalance] = useState< number | null >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const router = useRouter();

  const handleFund = async () => {
    try {
      setLoading(true);
      setError("");

      const parsedAmount = Number(amount.replace(/,/g, ""));
      if (!parsedAmount || parsedAmount <= 0) {
        setError("Invalid Amount:amount must be greater than zero");
        setLoading(false);

         return;
      }

      const res = await api.post("/wallet/fund",{ amount: parsedAmount});
      SetBalance(res.data.balance);
      setLoading(false);
    } catch (err: any) {
      const errMsg = err.response?.data?.message ||  err.message || "Wallet funding failed";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ProtectedRoute>
      <div className="funding-page">
        <header className="fund-header">
          <button
              type="button"
              disabled={ loading }                      className="cancel-btn"
              >
              <Link href="/dashboard">
                { loading ? "" : "Cancel" }
              </Link>
          </button>
        </header>
        <h2 className="text-header">Funding Your Wallet</h2>
        {error && (
          <div className="err-box">
            <p className="texf-red">{ error }</p>
          </div>
        )}
        <div className="inp-box">
          <input
            type="text"
            value={ amount }
            onChange={ (e) => setAmount(e.target.value) }
            placeholder="EnterAmount"
            required
            className="inpt-fund" 
          />
          <button
            type="button"
            onClick={ () => handleFund() }
            disabled={ loading }
            className="submit-btn"
            >
            { loading ? "Processing..." : "Fund" }
            </button>
        </div>
        {balance !== null && (
          <div className="bal-box">
            <p>Your New Balance:  N{ balance }</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
