import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import { ProductProvider } from "./contexts/ProductContext";
import Products from "./pages/Products";

function App() {
    return (
        <ProductProvider>
            <div className="d-flex flex-column min-vh-100 bg-light">
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route
                            path="/product/:id"
                            element={<ProductDetails />}
                        />
                        <Route path="/products/:filter" element={<Products />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </div>
        </ProductProvider>
    );
}

export default App;
