import { useParams, Link } from "react-router-dom";
import { products } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function ProductList() {
  const { slug } = useParams();
  const list = products.filter(p => p.category === slug);

  return (
    <section className="stack gap">
      <div className="row between">
        <h1 className="cap">{slug.replaceAll("-", " ")}</h1>
        <Link to="/categories" className="muted">All categories</Link>
      </div>
      {list.length === 0 ? (
        <p className="muted">No products yet.</p>
      ) : (
        <div className="grid products">{list.map(p => <ProductCard key={p.id} product={p} />)}</div>
      )}
    </section>
  );
}
