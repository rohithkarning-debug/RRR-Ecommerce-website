import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Categories from "./pages/Categories.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";

import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Search from "./pages/search.jsx";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app">
          <Navbar />

          <main className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/category/:slug" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/search" element={<Search />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </main>

          <footer className="footer">
            © {new Date().getFullYear()} ElectroMart
          </footer>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
