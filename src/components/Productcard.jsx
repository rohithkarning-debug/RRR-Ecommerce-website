import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="card">
      <Link to={`/product/${product.id}`} className="thumb-wrap">
        <img src={product.image} alt={product.title} loading="lazy" />
      </Link>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="muted">{product.brand}</p>
        <div className="card-row">
          <span className="price">₹{product.price.toLocaleString()}</span>
          <button className="btn" onClick={() => addToCart(product, 1)}>Add</button>
        </div>
      </div>
    </div>
  );
}
