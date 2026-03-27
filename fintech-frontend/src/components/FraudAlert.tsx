"use client";

import { useState, useEffect } from "react";
import { socket } from "@/lib/socket.io";
import { toast } from "sonner";

interface FraudAlert {
  transactionId: string;
  reason: string;
  risk: string;
}

interface Channel {
  channel: string;
}


export default function FraudAlert({ channel} : Channel) {
  const [fraudAlerts, setFraudAlerts] = useState<FraudAlert[]>([]);
  const [alertBox, setAlertBox] = useState<FraudAlert | null>(null);
  const [openTab, setOpenTab] = useState(false);
  // const [storedData, setStoredData] = useState<any | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId)
      return;

    if (!socket.connected)
      socket.connect();
      
    socket.emit("join-room", userId);

    const handleAlert = (data: FraudAlert) => {
      setFraudAlerts((prev: any) => [ ...prev, data ]);
      console.log("⚠️ Suspicious activity detected", data);
      toast.error("⚠️ Critical security Alert",{
        description: "Ambrose detected a high risk transaction",
        duration: 10000,
      });

      // storedData = data;
      setAlertBox(data);
    };
  
    socket.on(channel, handleAlert);

    return () => {
      socket.off(channel, handleAlert);
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
               {fraudAlerts.map((alert: FraudAlert, idx: any) => (
                <div className="alert-box" key={ alert.transactionId || idx } >
                  <p>Ambrose detected suspicious transaction in transaction { alert.transactionId }</p>
                  <p><strong>Reason:</strong> {alert.reason}</p>
                  <p><strong>Risk Level:</strong> {alert.risk}</p>
                </div>
               ))}
              </>
            )}
          {openTab && (
            <button
              type="button"
              onClick={() => {
                fraudAlerts.length > 0 ? setAlertBox(alertBox) : setAlertBox(null);
                setOpenTab(false);
              }}
              className="close-alert-btn"
              >
                close
            </button>
          )}
        </div>
      )}
    </div>
  );
}
