import { Link } from "react-router-dom";
import { categories } from "../data/products.js";

export default function Categories() {
  return (
    <section className="stack gap">
      <h1>Categories</h1>
      <div className="grid cats lg">
        {categories.map(c => (
          <Link key={c.slug} to={`/category/${c.slug}`} className="cat">
            <img src={c.image} alt={c.name} loading="lazy" />
            <span>{c.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
