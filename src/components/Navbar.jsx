// src/components/Navbar.jsx
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { categories } from "../data/products.js";

export default function Navbar() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const cartCount = Object.values(items).reduce((n, x) => n + x.qty, 0);

  // SEARCH
  const urlQ = new URLSearchParams(location.search).get("q") || "";
  const [q, setQ] = useState(urlQ);
  useEffect(() => setQ(urlQ), [urlQ]);

  function submit(e) {
    e.preventDefault();
    const qs = q.trim();
    navigate(qs ? `/search?q=${encodeURIComponent(qs)}` : "/");
  }

  // THEME
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    setDark(isDark);
    if (isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  function toggleTheme() {
    setDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  }

  // RESPONSIVE MENU
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function close(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <header className="nav">
      {/* Left section */}
      <div className="row" style={{ gap: 12 }}>
        <Link to="/" className="brand">RRR_Mart</Link>
      </div>

      {/* Nav links (responsive) */}
      <nav className={`navlinks ${open ? "show" : ""}`}>
        <NavLink to="/" end>Home</NavLink>

        <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
          <button className="nav-btn" onClick={() => setCatOpen(!catOpen)}>
            Categories ▾
          </button>

          {catOpen && (
            <div className="dropdown" style={{
              position: "absolute",
              top: "calc(100% + 5px)",
              left: 0,
              background: "var(--card)",
              border: "1px solid var(--border)",
              padding: 10,
              borderRadius: 10,
              zIndex: 100,
              minWidth: 180
            }}>
              {categories.map(c => (
                <Link
                  key={c.slug}
                  to={`/category/${c.slug}`}
                  onClick={() => { setCatOpen(false); setOpen(false); }}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Search bar */}
      <form onSubmit={submit} style={{ flex: 1, maxWidth: 450, marginLeft: 12, marginRight: 12 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products…"
          style={{
            width: "100%",
            padding: "10px 12px",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            color: "var(--text)"
          }}
        />
      </form>

      {/* Right side: theme, user, cart */}
      <div className="row" style={{ gap: 10 }}>
        {/* Theme toggle */}
        <button className="icon-btn" onClick={toggleTheme}>
          {dark ? "☀️" : "🌙"}
        </button>

        {/* If NOT logged in → show Login + Sign Up */}
        {!user ? (
          <>
            <button onClick={() => navigate("/login")} className="nav-btn">Login</button>
            <button onClick={() => navigate("/signup")} className="nav-btn">Sign Up</button>
          </>
        ) : (
          /* If logged in → show username + avatar + logout */
          <div style={{ position: "relative" }}>
            <button
              className="nav-btn"
              onClick={() => {
                const menu = document.getElementById("profile-menu");
                menu.style.display = menu.style.display === "block" ? "none" : "block";
              }}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <div style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "var(--accent)",
                color: "#fff",
                fontWeight: "bold",
                display: "grid",
                placeItems: "center"
              }}>
                {user.username ? user.username[0].toUpperCase() : "U"}
              </div>

              {user.username?.split(" ")[0]} ▾
            </button>

            <div id="profile-menu" style={{
              display: "none",
              position: "absolute",
              right: 0,
              top: "calc(100% + 8px)",
              background: "var(--card)",
              border: "1px solid var(--border)",
              padding: 10,
              borderRadius: 10,
              minWidth: 150,
              zIndex: 200
            }}>
              <button
                className="link"
                onClick={() => {
                  logout();
                  navigate("/");
                  document.getElementById("profile-menu").style.display = "none";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Cart */}
        <button className="cart-btn" onClick={() => navigate("/cart")}>
          🛒 Cart
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}
