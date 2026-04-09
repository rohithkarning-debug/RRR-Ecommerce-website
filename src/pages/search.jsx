import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";

export default function Search() {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get("q")?.toLowerCase().trim() || "";

  const filtered = products.filter((item) => {
    const title = (item.title || "").toLowerCase();
    const category = (item.category || "").toLowerCase();
    const brand = (item.brand || "").toLowerCase();
    return (
      title.includes(query) ||
      category.includes(query) ||
      brand.includes(query)
    );
  });

  return (
    <div className="search-page stack gap">
      <h2>Search Results for: "{query}"</h2>

      {filtered.length === 0 ? (
        <p className="muted">No results found.</p>
      ) : (
        <div className="grid products">
          {filtered.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
