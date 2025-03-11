import { createContext, useContext, useState } from "react";
import productDataList from "../assets/products.json";
import addressData from "../assets/address.json";

const ProductContext = createContext();

const useProduct = () => useContext(ProductContext);
export default useProduct;

export function ProductProvider({ children }) {
    const [productList, setProductList] = useState(productDataList);
    const [addresses, setAddresses] = useState(addressData);
    const [loading, setLoading] = useState(false);

    function hi() {
        const obj = {};
        for (const p of productList) {
            if (!obj[p.category]) {
                obj[p.category] = true;
            }
        }
        console.log(Object.keys(obj));
    }
    // hi();

    // Add and remove from cart
    const toggleCart = (productId) => {
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

    // Toggle primary address selection
    const handlePrimaryAddress = (addressId) => {
        const newAddresses = addresses.map((a) =>
            a.id == addressId ? { ...a, isPrimary: !a.isPrimary } : a
        );
        setAddresses(newAddresses);
    };

    return (
        <ProductContext.Provider
            value={{ productList, toggleCart, toggleWishList }}
        >
            {children}
        </ProductContext.Provider>
    );
}
