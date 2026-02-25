"use client"

import ProtectedRoute from "@/components/protectedRoutes";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import api from "@/lib/api";
import ReactMarkdown from "react-markdown";

type ChatType = {
  role: string,
  content: string
};

export default function ChatPage() {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChats, setLoadingChats] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    return bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [chats]);


  const fetchHistory = useCallback(async () => {
    try {
      setError("");
      const res = await api.get("/ai/chat/history");
      setChats(res.data.chats);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load previous chats");
    }
  }, []);

  useEffect(() => {
    fetchHistory().finally(() => setLoadingChats(false));
  }, [fetchHistory]);


  const sendMessage = async () => {
    const msgToSend = message.trim();
    if (!msgToSend)
      return;

    const userMessage = {
      role: "user",
      content: msgToSend,
    };
    setChats((prev) => [...prev, userMessage]);
    setMessage(""); // input field clears ad soon as send button is clicked

    setLoading(true); // start loading
    try {
      const aiReply = await api.post("/ai/chat", { message: msgToSend });
      const aiMessage = {
        role: "assistant",
        content: aiReply.data.reply,
      }
      setChats((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error: Ambrose Could not reply");
    } finally {
      setLoading(false);
    }
  }

    return (
      <ProtectedRoute>
        <div className="ai-page">
          {loadingChats && (
            <p>Loading Message...</p>
          )}
          <header className="ai-header">
            <button
              type="button"
              className="go-back-btn"
            >
              <Link href="/dashboard">
                Go back
              </Link>
            </button>
            { error && <p className="text-red">{ error }</p> }
          </header>
          <div className="msg-box">
            { Array.isArray(chats) && (
              chats.map((msg, idx) => {
              return (
                <div
                  className={ msg.role === "user" ? "user-chat-box" : "ai-chat-box" }
                  key={ idx }
                  style={{ textAlign: msg.role === "user" ? "right": "left" }}
                >
                  <span className="role">
                    {msg.role === "user" ? "You" : "Ambrose"}
                    <br />
                  </span>
                  <ReactMarkdown>{ msg.content }</ReactMarkdown>
              </div>
              );
            })
          ) }
          { loading && (
            <p>Ambrse is typing</p>
          ) }
            <div ref={ bottomRef } />
          </div>
          <div className="inpt-box">
            <input
              type="text"
              value={ message }
              onChange={ (e) => setMessage(e.target.value) }
              placeholder="Ask Ambrose"
              className="inpt-msg"
            />
            <button
              type="button"
              onClick={ sendMessage }
              disabled={ loading }
              className="submit-btn"
            >
            Send
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
