import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();
  const amount = state?.amount || 0;
  const method = state?.method || "UPI";

  return (
    <section
      className="stack gap"
      style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}
    >
      <h1>🎉 Order Placed Successfully!</h1>

      <p>
        Payment via <strong>{method}</strong> was recorded.
      </p>

      <h2 className="price big">₹{amount.toLocaleString()}</h2>

      <Link to="/" className="btn" style={{ marginTop: 16 }}>
        Back to Home
      </Link>

      <p className="muted" style={{ marginTop: 10 }}>
        (Demo mode — no real transaction.)
      </p>
    </section>
  );
}
