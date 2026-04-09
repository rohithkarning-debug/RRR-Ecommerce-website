import { useParams } from "react-router-dom";
import { products } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => String(p.id) === id);
  const { addToCart } = useCart();

  if (!product) return <p className="muted">Product not found.</p>;

  return (
    <section className="product-detail">
      <div className="pd-gallery">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="pd-info">
        <h1>{product.title}</h1>
        <p className="muted">{product.brand}</p>
        <p className="price big">₹{product.price.toLocaleString()}</p>
        <p>{product.description}</p>
        <div className="row">
          <button className="btn" onClick={() => addToCart(product, 1)}>Add to cart</button>
        </div>
      </div>
    </section>
  );
}
