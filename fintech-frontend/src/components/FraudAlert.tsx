"use client";

import { useState, useEffect } from "react";
import { socket } from "@/lib/socket.io";
import { toast } from "sonner";

export default function FraudAlert() {
  const [fraudAlerts, setFraudAlerts] = useState<any>([]);
  const [alertBox, setAlertBox] = useState<any | null>(null);

  useEffect(() => {
    const listenForFraud = () => {
      const userId = localStorage.getItem("userId");
      if (!userId)
        return;

      if (!socket.connected)
        socket.connect();

      socket.emit("join-room", userId);

      socket.on("fraud-alert", (data: any) => {
        setFraudAlerts((prev: any) => [ ...prev, data ]);
        console.log("⚠️ Suspicious activity detected", data);
        toast.error("⚠️ Fraud Alert", {
          description: data.reason
        });

        setAlertBox(data);
      });

      return () => socket.off("fraud-alert");
    };
    listenForFraud();
  }, []);

  return (
    <div className="fraud-box">
      <div className="num-frauds">
        <h3>⚠️ fraud Alerts: { fraudAlerts.length }</h3>
      </div>
      {alertBox && (
        <div className="pop-up">
          <div className="alert-box">
            <h2>⚠️ Fraud Alert</h2>
            <p>Ambrose detected suspicious transaction in transaction { alertBox.transactionId }</p>
            <p><strong>Reason:</strong> {alertBox.reason}</p>
            <p><strong>Risk level:</strong> {alertBox.risk}</p>
          </div>
          <button
            type="button"
            onClick={() => setAlertBox(null) }
            className="close-alert-btn"
            >
              close
          </button>
        </div>
      )}
    </div>
  );
}
