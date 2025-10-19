import { useState, useEffect, useMemo, useRef } from "react";
import api from "../services/api";

export default function Chat() {
  const [sessionId, setSessionId] = useState(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([]);
  const [displayedAssistant, setDisplayedAssistant] = useState("");
  const [emotion, setEmotion] = useState("neutral");
  const [lastAnalysis, setLastAnalysis] = useState(null);

  const scrollRef = useRef(null);
  const bottomRef = useRef(null);
  const typingTimerRef = useRef(null);

  const emotionPalette = {
    joy: { chip: "#16a34a", bg: "linear-gradient(180deg,#0a0a0a,#0f1411)" },
    sadness: { chip: "#2563eb", bg: "linear-gradient(180deg,#0a0a0a,#0f1117)" },
    anxiety: { chip: "#f59e0b", bg: "linear-gradient(180deg,#0a0a0a,#15120e)" },
    anger: { chip: "#ef4444", bg: "linear-gradient(180deg,#0a0a0a,#170f0f)" },
    neutral: { chip: "#6b7280", bg: "linear-gradient(180deg,#0a0a0a,#0a0a0a)" },
  };

  const theme = emotionPalette[emotion] || emotionPalette.neutral;

  useEffect(() => {
    (async () => {
      const res = await api.post("/api/session/start");
      setSessionId(res.data.sessionId);
    })();
  }, []);

  // 🔄 Smooth auto-scroll whenever messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, displayedAssistant]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, []);

  const suggestions = useMemo(() => {
    const chips = [];
    const fallback = [
      "Can you help me with a small plan?",
      "I’m feeling overwhelmed—what should I do first?",
      "Can you guide a 2-minute breathing exercise?",
    ];
    if (!lastAnalysis) return fallback;
    const { intent, topic } = lastAnalysis;
    if (intent === "request_solution") chips.push("Give me 3 concrete steps.");
    else chips.push("What’s a tiny step I can do now?");
    if (topic === "exam_stress")
      chips.push("Help me plan the next study hour.");
    if (topic === "anxiety_panic") chips.push("Walk me through grounding now.");
    if (topic === "sleep") chips.push("Suggest a pre-sleep routine.");
    if (topic === "workload_time") chips.push("Help me time-box today.");
    return [...chips, ...fallback].slice(0, 5);
  }, [lastAnalysis]);

  const stopTyping = () => {
    if (typingTimerRef.current) {
      clearInterval(typingTimerRef.current);
      typingTimerRef.current = null;
    }
  };

  const typeOut = (fullText) => {
    stopTyping();
    setDisplayedAssistant("");
    let i = 0;
    typingTimerRef.current = setInterval(() => {
      i += 2;
      setDisplayedAssistant(fullText.slice(0, i));
      if (i >= fullText.length) {
        stopTyping();
        setMessages((prev) => [
          ...prev.filter((m) => m.role !== "assistant-temp"),
          { role: "assistant", text: fullText, id: crypto.randomUUID() },
        ]);
      }
    }, 20);
  };

  const sendMessage = async (textOptional) => {
    if (sending) return;
    const text = (textOptional ?? input).trim();
    if (!text) return;
    setSending(true);
    setInput("");

    const userMsg = { role: "user", text, id: crypto.randomUUID() };
    setMessages((prev) => [...prev, userMsg]);
    setMessages((prev) => [
      ...prev,
      { role: "assistant-temp", text: "", id: "typing" },
    ]);
    setDisplayedAssistant("…");

    try {
      const res = await api.post("/api/chat", { sessionId, message: text });
      const { reply, emotion: serverEmotion, analysis } = res.data || {};
      setEmotion(serverEmotion || "neutral");
      setLastAnalysis(analysis || null);
      typeOut(
        reply || "I’m here with you. Tell me more about what’s happening."
      );
    } catch {
      typeOut("Sorry — I had trouble reading that. Could you try again?");
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.bg,
        color: "#fff",
        fontFamily: "Inter, system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          backdropFilter: "blur(6px)",
          background: "rgba(0,0,0,0.35)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: theme.chip,
              }}
            />
            MindMate
          </div>
          <div
            style={{
              background: theme.chip,
              color: "#0a0a0a",
              padding: ".4rem 1rem",
              borderRadius: "999px",
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {emotion}
          </div>
        </div>
      </header>

      {/* Messages */}
      <main
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "2rem 1rem",
          maxWidth: 800,
          width: "100%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          scrollBehavior: "smooth",
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#d1d5db",
              marginTop: "20vh",
              fontSize: "1.1rem",
              opacity: 0.8,
            }}
          >
            👋 Hi — I’m here for{" "}
            <strong>stress, mood, focus, and anxiety</strong>.
            <br />
            Tell me what’s going on, and I’ll suggest practical next steps.
          </div>
        )}

        {messages.map((m) => {
          const isUser = m.role === "user";
          const bubble = isUser
            ? "linear-gradient(135deg, #3a7bd5, #00e5ff)"
            : "#171a23";
          const textColor = isUser ? "#0a0a0a" : "#fff";

          return (
            <div
              key={m.id}
              style={{
                display: "flex",
                justifyContent: isUser ? "flex-end" : "flex-start",
                margin: "0.6rem 0",
                animation: "fadeIn 0.4s ease",
              }}
            >
              <div
                style={{
                  maxWidth: "80%",
                  background: bubble,
                  color: textColor,
                  padding: "14px 18px",
                  borderRadius: isUser
                    ? "16px 16px 4px 16px"
                    : "16px 16px 16px 4px",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                  border: "1px solid rgba(255,255,255,0.05)",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {m.role === "assistant-temp" ? displayedAssistant : m.text}
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </main>

      {/* Suggestions */}
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: ".5rem",
          justifyContent: "center",
          marginBottom: ".8rem",
        }}
      >
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => sendMessage(s)}
            style={{
              background: "transparent",
              color: "#e5e7eb",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999,
              padding: ".5rem 1rem",
              cursor: "pointer",
              fontSize: ".9rem",
              transition: "border-color 0.2s",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: "#0f1117",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            maxWidth: 800,
            gap: ".5rem",
            background: "#0f1117",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 14,
            padding: ".5rem",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Tell me what’s going on…"
            style={{
              flex: 1,
              background: "transparent",
              color: "#fff",
              border: "none",
              outline: "none",
              fontSize: "1rem",
              padding: ".8rem .9rem",
            }}
          />
          <button
            disabled={sending || !input.trim()}
            onClick={() => sendMessage()}
            style={{
              background: sending ? "rgba(255,255,255,0.12)" : theme.chip,
              color: "#0a0a0a",
              border: "none",
              borderRadius: 10,
              padding: ".8rem 1.2rem",
              fontWeight: 700,
              cursor: sending ? "not-allowed" : "pointer",
              transition: "opacity 0.2s",
            }}
          >
            {sending ? "…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
