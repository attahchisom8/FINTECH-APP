"use client";


import ReactMarkDown from "react-markdown";

interface InsightPropType {
  insight: string;
}
export default function InsightCard(
  { insight } : InsightPropType
) {
  return (
    <div className="insight-card">
      <h3 className="insight-title">AI insights</h3>
      <div className="insight-tab">
        <p className="texr-insight">
          <ReactMarkDown>{ insight }</ReactMarkDown>
        </p>
      </div>
    </div>
  )
}
