export default function Message({ role, text }) {
  return (
    <div className={`msg ${role}`}>
      <div className="bubble">
        {role === "counselor" ? `🧑‍⚕️ Counselor: ${text}` : text}
      </div>
    </div>
  );
}
