"use client";

import { useForcastStore } from "@/store/forecastStore";
import { useEffect } from "react";


export default function ForecastCard() {
  const {
    error,
    data: forecastData,
    loading,
    fetchForcast,
  } = useForcastStore();

  useEffect(() => {
    fetchForcast();
  }, [fetchForcast]);

  if (loading)
    return <p>loading...</p>
  if (!forecastData)
    return <p>Wait a moment, loading forecast details...</p>
  if (error)
      return <p className="text-red">{ error }</p>

  return (
    <div className="forecast-card">
      <h2>Forecast information</h2>
      <p>If you continue in current manner of spending: It is forcasted that: </p>
      <p>Next Month expenses will be: {forecastData.predictedExpenses} </p>
      <p>Next Month balance will be: {forecastData.predictedBalance} </p>
      <p>Next Month spending trend will be: {forecastData.spendingTrend} </p>
    </div>
  )
}
