"use client";

import { useState, useEffect } from "react";
import { socket } from "@/lib/socket.io";
import { toast } from "sonner";

export default function FraudAlert() {
  const [fraudAlerts, setFraudAlerts] = useState<any>([]);
  const [alertBox, setAlertBox] = useState<any | null>(null);
  const [openTab, setOpenTab] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId)
      return;

    if (!socket.connected)
      socket.connect();
      
    socket.emit("join-room", userId);

    socket.on("fraud-alert", (data: any) => {
      setFraudAlerts((prev: any) => [ ...prev, data ]);
      console.log("⚠️ Suspicious activity detected", data);
      toast.error("⚠️ Critical security Alert",{
        description: "Ambrose detected a high risk transaction",
        duration: 10000,
      });

      setAlertBox(data);
    });

    return () => {
      socket.off("fraud-alert");
    }
      
  }, []);

  return (
    <div className="fraud-box">
      <div className="fraud-status-box">
        <div className="alert-bell">
          <span className="bell">🔔</span>
          { fraudAlerts.length > 0 && (
            <span className="num-fraud pulse">
              { fraudAlerts.length }
            </span>
          ) }
        </div>
        <h3 className="text-alert">
        { fraudAlerts.length > 0 ? `${ fraudAlerts.length } security Alert` : "System Secure"}
        </h3>
      </div>
      {alertBox && (
        <div className="pop-up">
          <button
            onClick={() => setOpenTab(true)}
            type="button"
            className="open-tab">
              View Alerts
            </button>
            { openTab && fraudAlerts.length > 0 && (
              <>
               <h2>⚠️ Fraud Alert</h2>
               {fraudAlerts.map((alert: any, idx: any) => (
                <div className="alert-box" key={idx} >
                  <p>Ambrose detected suspicious transaction in transaction { alert.transactionId }</p>
                  <p><strong>Reason:</strong> {alert.reason}</p>
                  <p><strong>Risk Level:</strong> {alert.risk}</p>
                </div>
               ))}
              </>
            )}
          <button
            type="button"
            onClick={() => {
              setAlertBox(null);
              setOpenTab(false);
            }}
            className="close-alert-btn"
            >
              close
          </button>
        </div>
      )}
    </div>
  );
}
