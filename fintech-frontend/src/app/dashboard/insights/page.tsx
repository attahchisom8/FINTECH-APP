"use client"


import HealthScore from "@/components/HealthScore";
import SpendingChat from "@/components/SpendingChart";
import InsightCard from "@/components/InsigtCard";
import { useInsightsStore } from "@/store/insights.store";
import { useEffect } from "react";
import ProtectedRoute from "@/components/protectedRoutes";
import PredictionCard from "@/components/PredictionCard";
import Link from "next/link";

export default function InsightsPage() {
  const {
    error,
    loading,
    data,
    fetchInsights,
  } = useInsightsStore();

  useEffect(() => {
    fetchInsights();
  }, []);

  if (loading || !data)
    return (<p>Loading insights..
            </p>)

  return (
    <ProtectedRoute>
      <div className="insights-page">
        <header>
          <h1 className="insights-main-title">
            INSIGHTS DASHBOARD
          </h1>
          { error && (
            <p className="text-red">{ error }</p>
          ) }
          <button
            type="button"
            className="insights-btn"
          >
            <Link href="/dashboard">
              Go Back
            </Link>
          </button>
        </header>
        <div className="insights-navbar">
          <HealthScore score={data.healthScore} />
          <PredictionCard prediction={ data.prediction } />
        </div>
        <InsightCard insight={ data.aiInsight } />
        <SpendingChat prediction={ data.prediction } />
      </div>
    </ProtectedRoute>
  )
}
