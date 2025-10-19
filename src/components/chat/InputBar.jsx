import { useState } from "react";
import { Send } from "lucide-react";
import "../../styles/chat.css";

export default function InputBar({ onSend, loading }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() === "") return;
    onSend(message);
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-bar">
      <input
        type="text"
        placeholder="Type your message…"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        disabled={loading}
      />
      <button
        className="send-btn"
        onClick={handleSend}
        disabled={loading || message.trim() === ""}
      >
        <Send size={20} />
      </button>
    </div>
  );
}
