"use client";


import {
  ResponsiveContainer,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  CartesianGrid,
} from "recharts";


interface BarCharPropType {
  prediction: any
}

export default function SpendingChat(
  { prediction }: BarCharPropType
) {
  const data = [
    {
      name: "prediction",
      amount: Number(prediction),
    }
  ];

  return (
    <div
      className="spending-chart"
      style={{ height: "320px", width: "100%", marginTop: "32px" }}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={ data }>
          <XAxis dataKey="name" stroke="#459a22" />
          <YAxis stroke="#459a22"/>
          <Bar dataKey="amount" fill="#2240F1" />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
      </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
