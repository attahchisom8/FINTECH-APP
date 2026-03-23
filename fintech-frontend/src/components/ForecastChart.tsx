"use client";


import { useEffect } from "react";
import { useForcastStore } from "@/store/forecastStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from  "recharts";

export default function ForecastChart() {
  const {
    loading,
    data: forecastData,
    error,
    fetchForcast,
  } = useForcastStore();

  useEffect(() => {
    fetchForcast();
  }, [fetchForcast]);

  if (loading)
    return <p className="text-loading">Loading...</p>
  if (!forecastData)
    return <p>Wait a moment, loading charts...</p>
  if (error)
      return <p className="text-red">{ error }</p>;

  return (
    <div className="forecast-chart">
      <h2>View forecast data</h2>
      <ResponsiveContainer width="100%" height="50%">
        <LineChart data={ forecastData.charData }>
          <XAxis dataKey="month" stroke="#2277ff" />
          <YAxis stroke="#2277ff"/>
          <Line dataKey="balance" stroke="#882200" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
