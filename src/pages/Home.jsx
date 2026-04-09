import { Link } from "react-router-dom";
import { featured, categories } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  return (
    <section className="stack gap">
      <div className="hero">
        <h1>All products in one place.</h1>
        <p className="muted">Phones, laptops, audio, accessories and more.</p>
        <div className="row">
          <Link className="btn" to="/category/electronics">Shop electronics</Link>
          <Link className="btn ghost" to="/categories">Browse categories</Link>
        </div>
      </div>

      <div className="grid cats">
        {categories.map(c => (
          <Link key={c.slug} to={`/category/${c.slug}`} className="cat">
            <img src={c.image} alt={c.name} loading="lazy" />
            <span>{c.name}</span>
          </Link>
        ))}
      </div>

      <h2>Featured</h2>
      <div className="grid products">
        {featured.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
