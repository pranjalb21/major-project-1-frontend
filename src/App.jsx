import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import useProduct, { ProductProvider } from "./contexts/ProductContext";
import Spinner from "./components/Spinner";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";
import ProductsPage from "./pages/ProductsPage";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/ReactToastify.css";
import "./index.css";


function App() {
    const { loading } = useProduct();
    return (
        <div className="d-flex flex-column min-vh-100 bg-light position-relative">
            <Navbar />
            {loading && <Spinner />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/order/:orderId" element={<OrderDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<ProductsPage />} />
            </Routes>
            <Footer />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
                bodyClassName="toastBody"
            />
        </div>
    );
}

export default App;
