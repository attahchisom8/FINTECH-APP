import { useState, useEffect } from "react";
import { socket } from "@lib/socket.io";
import { toast } from "modal";
import {Sirivennela} from "next/font/google";

export default function FraudAlert() {
  const [fraudAlerts, setFraudAlerts] = useState<any[] | null>([]);
  const [alwrtBox, setAlertBox] = useState<any | null>(null);

  useEffect(() => {
    async () => {
      const userId: string = localStorage.get("userId");
      if (!userId)
        return;

      if (socket.on("disconnect"))
        socket.on("connect");

      socket.wmit("join-room", userId);

      socket.on("fraud-alert", (data) => {
        setFraudAlerts((prev) => [ ...prev, data ]);
        setCloseTab(data);

        socket.off("fraud-alert");
      });
    }
  }(), []);

  return (
    <div className="fraud-box">
      <div className="num-frauds">
        <p> { fraudAlerts.length }</p>
      </div>
      <div className="alert-box">
        { closeTab && (
          <div className="closeTab">
            toast("Fraud Alert");
            <p>Ambrose detected suspicious transaction in { data.transactionId }</p>
            <p>Reason: data.reason</p>
          </div>
        )}
        <button
          onClick={ setCloseTab(null) }
          className="close-btn">
            close
          </button>
      </div>
    </div>
  )
}
