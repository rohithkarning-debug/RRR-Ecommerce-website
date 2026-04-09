
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

import phonepeQR from "../assets/phonepe.jpg";
import gpayQR from "../assets/googlepay.jpg";

export default function Checkout() {
  const { total, clear } = useCart();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState(null);

  const amount = total;

  function placeOrder() {
    clear();
    navigate("/order-success", {
      state: { amount, method: selectedMethod }
    });
  }

  return (
    <section className="stack gap" style={{ maxWidth: 500, margin: "0 auto" }}>
      <h1>Checkout</h1>

      <h3>Total Amount: ₹{amount.toLocaleString()}</h3>
      <p className="muted">Choose a payment method</p>

      {/* PAYMENT BUTTONS */}
      {!selectedMethod && (
        <div className="stack gap">
          <button className="btn" onClick={() => setSelectedMethod("PhonePe")}>
            Pay with PhonePe
          </button>

          <button className="btn" onClick={() => setSelectedMethod("Google Pay")}>
            Pay with Google Pay
          </button>

          <button className="btn" onClick={() => placeOrder("Paytm")}>
            Pay with Paytm
          </button>

          <button className="btn ghost" onClick={() => placeOrder("Cash on Delivery")}>
            Cash on Delivery (COD)
          </button>
        </div>
      )}

      {/* QR IMAGE SECTION */}
      {selectedMethod && (
        <div className="stack gap" style={{ marginTop: 20, textAlign: "center" }}>
          <h3>Scan with {selectedMethod}</h3>

          <img
            src={selectedMethod === "PhonePe" ? phonepeQR : gpayQR}
            alt={selectedMethod}
            style={{
              width: 240,
              height: 240,
              margin: "0 auto",
              padding: 12,
              background: "white",
              borderRadius: 12,
              border: "1px solid var(--border)"
            }}
          />

          <p className="muted">After you scan and pay, click the button below.</p>

          <button className="btn" onClick={placeOrder}>
            I Paid
          </button>

          <button className="btn ghost" onClick={() => setSelectedMethod(null)}>
            Back
          </button>
        </div>
      )}

      <p className="muted" style={{ marginTop: 12 }}>
        (Demo only — no real payment happens.)
      </p>
    </section>
  );
}
