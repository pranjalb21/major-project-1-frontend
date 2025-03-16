import { createContext, useContext, useEffect, useState } from "react";
import productDataList from "../assets/products.json";
import addressData from "../assets/address.json";

const ProductContext = createContext();

const useProduct = () => useContext(ProductContext);
export default useProduct;

export function ProductProvider({ children }) {
    const [productList, setProductList] = useState();
    const [selectedProduct, setSelectedProduct] = useState();
    const [wishlist, setWishlist] = useState();
    const [cart, setCart] = useState();
    const [addresses, setAddresses] = useState(addressData);
    const [loading, setLoading] = useState(false);

    async function initialLoad() {
        setLoading(true);
        fetchProduct("all");
        fetchWishlist();
        fetchCart();
    }
    useEffect(() => {
        initialLoad();
    }, []);

    // Add and remove from cart
    const toggleCart = async (productId) => {
        const newProductList = productList.map((p) => {
            if (p.id == productId) {
                return { ...p, isAddedToCart: !p.isAddedToCart };
            } else {
                return p;
            }
        });
        setProductList(newProductList);
    };

    // Add and remove from wishlist
    const toggleWishList = (productId) => {
        const newProductList = productList.map((p) => {
            if (p.id == productId) {
                return { ...p, isAddedToWishlist: !p.isAddedToWishlist };
            } else {
                return p;
            }
        });
        setProductList(newProductList);
    };

    // Add new address
    const addAddress = (newAddress) => {
        const data = [...addresses, newAddress];
        setAddresses(data);
    };

    // Delete address
    const deleteAddress = (addressId) => {
        const newAddresses = addresses.filter((a) => a.id != addressId);
        setAddresses(newAddresses);
    };

    // Productlist changes based on category
    const fetchProduct = async (type) => {
        setLoading(true);
        setSelectedProduct(null);
        setProductList(null);
        await fetch(`http://localhost:5000/products/category/${type}`)
            .then((res) => res.json())
            .then((data) => setProductList(data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    // Get product by product ID
    const getProductById = async (productId) => {
        setLoading(true);
        setSelectedProduct(null);
        await fetch(`http://localhost:5000/products/id/${productId}`)
            .then((res) => res.json())
            .then((data) => setSelectedProduct(data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    // Fetch wishlist
    const fetchWishlist = async () => {
        setLoading(true);
        setWishlist(null);
        await fetch(`http://localhost:5000/wishlist/all`)
            .then((res) => res.json())
            .then((data) => setWishlist(data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    // Fetch cart
    const fetchCart = async () => {
        setLoading(true);
        setWishlist(null);
        await fetch(`http://localhost:5000/cart/all`)
            .then((res) => res.json())
            .then((data) => setCart(data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    // Toggle primary address selection
    const handlePrimaryAddress = (addressId) => {
        const newAddresses = addresses.map((a) =>
            a.id == addressId ? { ...a, isPrimary: !a.isPrimary } : a
        );
        setAddresses(newAddresses);
    };

    return (
        <ProductContext.Provider
            value={{
                productList,
                loading,
                selectedProduct,
                wishlist,
                cart,
                toggleCart,
                toggleWishList,
                fetchProduct,
                getProductById,
                fetchWishlist,
                fetchCart,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
