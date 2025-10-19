import { useEffect, useRef } from "react";
import Message from "./Message";

export default function MessageList({ messages, loading }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  return (
    <div id="chat-scroll" className="chat-scroll">
      {messages.map((m, i) => (
        <Message key={i} role={m.role} text={m.text} />
      ))}
      <div ref={endRef} />
    </div>
  );
}
