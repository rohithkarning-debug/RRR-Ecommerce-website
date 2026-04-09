
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, setQty, removeFromCart, total, clear } = useCart();
  const navigate = useNavigate();
  const list = Object.values(items);

  return (
    <section className="stack gap">
      <h1>Your Cart</h1>

      {list.length === 0 ? (
        <p className="muted">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart items */}
          <div className="cart">
            {list.map(({ item, qty }) => (
              <div className="cart-row" key={item.id}>
                <img src={item.image} alt={item.title} />

                <div className="grow">
                  <div className="title">{item.title}</div>
                  <div className="muted">{item.brand}</div>
                </div>

                <div className="qty">
                  <input
                    type="number"
                    min="0"
                    value={qty}
                    onChange={(e) =>
                      setQty(item.id, Number(e.target.value))
                    }
                  />
                </div>

                <div className="price">
                  ₹{(item.price * qty).toLocaleString()}
                </div>

                <button
                  className="link danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total + buttons */}
          <div className="row end" style={{ marginTop: 12 }}>
            <div className="total">
              Total: ₹{total.toLocaleString()}
            </div>

            <button className="btn ghost" onClick={clear}>
              Clear
            </button>

            {/* Checkout Button → navigates to Payment Page */}
            <button
              className="btn"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
}
