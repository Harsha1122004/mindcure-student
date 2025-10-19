import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100vh",
        background: "linear-gradient(180deg, #0b0e17, #0f111a)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Logo + Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: "1rem" }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>🧠</div>
        <h1
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            fontWeight: 800,
            letterSpacing: "1px",
            background: "linear-gradient(135deg, #3a7bd5, #00e5ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          MindMate
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          fontSize: "1.3rem",
          maxWidth: "650px",
          color: "#a0aec0",
          marginBottom: "2rem",
          lineHeight: "1.8",
        }}
      >
        Your personal mental well-being companion — here to listen, support, and
        guide you through{" "}
        <strong>stress, anxiety, and emotional challenges.</strong>
        Everything you share stays private.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ display: "flex", gap: "1.2rem" }}
      >
        <Link to="/chat" style={primaryButton}>
          💬 Start a Conversation
        </Link>
        <Link to="/resources" style={secondaryButton}>
          📚 Explore Resources
        </Link>
      </motion.div>

      {/* Footer tagline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          marginTop: "3rem",
          color: "#8b8b8f",
          fontSize: "0.95rem",
          letterSpacing: "0.3px",
        }}
      >
        Why MindMate? • Private & Secure • Emotion Detection • Crisis Escalation
        • 24/7 Support
      </motion.div>
    </div>
  );
}

const primaryButton = {
  padding: "1rem 2.2rem",
  background: "linear-gradient(135deg, #3a7bd5, #00e5ff)",
  color: "#fff",
  borderRadius: "14px",
  textDecoration: "none",
  fontSize: "1.1rem",
  fontWeight: "bold",
  transition: "0.3s",
};

const secondaryButton = {
  ...primaryButton,
  background: "transparent",
  border: "2px solid #fff",
  color: "#fff",
};
