import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem 1.2rem" }}>
        <div className="container">{children}</div>
      </main>
      <footer
        style={{
          borderTop: "1px solid var(--line)",
          padding: "1.2rem",
          color: "var(--muted)",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} MindMate — Minimal Edition
      </footer>
    </>
  );
}
