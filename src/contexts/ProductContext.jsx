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
        if (isExistInCart(productId)) {
        }
        const newProductList = productList.map((p) => {
            if (p.id == productId) {
                return { ...p, isAddedToCart: !p.isAddedToCart };
            } else {
                return p;
            }
        });
        setProductList(newProductList);
    };

    // Add item in cart
    const addItemToCart = async (productId) => {
        setLoading(true);
        const addedItem = await fetch(
            `http://localhost:5000/cart/add/${productId}`,
            { method: "POST" }
        )
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.log(err));

        if (addedItem) {
            if (isExistInCart(productId)) {
                const existingProductIndex = cart.findIndex(
                    (cartItem) => cartItem.productId._id === productId
                );

                const newCart = [...cart];
                newCart.splice(existingProductIndex, 1, addedItem);

                setCart(newCart);
            } else {
                const newCart = [...cart, addedItem];
                setCart(newCart);
            }
        } else {
            console.log("Error while adding to cart");
        }
        setLoading(false);
    };
    // Add item in cart
    const addItemWithQuantityToCart = async (productId, quantity) => {
        setLoading(true);
        const addedItem = await fetch(
            `http://localhost:5000/cart/addQuantity/${productId}`,
            {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ quantity }),
            }
        )
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.log(err));

        if (addedItem) {
            if (isExistInCart(productId)) {
                const existingProductIndex = cart.findIndex(
                    (cartItem) => cartItem.productId._id === productId
                );

                const newCart = [...cart];
                newCart.splice(existingProductIndex, 1, addedItem);

                setCart(newCart);
            } else {
                const newCart = [...cart, addedItem];
                setCart(newCart);
            }
        } else {
            console.log("Error while adding to cart");
        }
        setLoading(false);
    };

    // Remove item from cart
    const removeItemFromCart = async (productId) => {
        setLoading(true);
        const deletedItem = await fetch(
            `http://localhost:5000/cart/remove/${productId}`,
            { method: "DELETE" }
        )
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.log(err));
        if (deletedItem) {
            if (deletedItem.productCount > 0) {
                const existingProductIndex = cart.findIndex(
                    (cartItem) => cartItem.productId._id === productId
                );
                const newCart = [...cart];
                newCart.splice(existingProductIndex, 1, deletedItem);
                setCart(newCart);
            } else {
                const newCart = cart.filter(
                    (cartItem) => cartItem.productId._id !== productId
                );
                setCart(newCart);
            }
        } else {
            console.log("Error while removing from cart");
        }
        setLoading(false);
    };
    // Delete item from cart
    const deleteItemFromCart = async (productId) => {
        setLoading(true);
        const deletedItem = await fetch(
            `http://localhost:5000/cart/delete/${productId}`,
            { method: "DELETE" }
        )
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.log(err));
        if (deletedItem) {
            const newCart = cart.filter(
                (cartItem) => cartItem.productId._id !== productId
            );
            setCart(newCart);
        } else {
            console.log("Error while deleting from cart");
        }
        setLoading(false);
    };

    // Add and remove from wishlist
    const toggleWishList = async (productId) => {
        setLoading(true);

        if (isExistInWishlist(productId)) {
            await fetch(`http://localhost:5000/wishlist/remove/${productId}`, {
                method: "DELETE",
            })
                .then(() => {
                    const newWishlist = wishlist.filter(
                        (product) => product.productId._id !== productId
                    );
                    setWishlist(newWishlist);
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        } else {
            await fetch(`http://localhost:5000/wishlist/add/${productId}`, {
                method: "POST",
            })
                .then((res) => res.json())
                .then((data) => {
                    const newWishlist = [...wishlist, data.data];
                    setWishlist(newWishlist);
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false));
        }
    };

    // Check if product exist into wishlist
    const isExistInWishlist = (productId) => {
        const isExists = wishlist?.filter(
            (product) => product.productId._id === productId
        );
        return isExists?.length > 0;
    };

    // Check if product exist in cart
    const isExistInCart = (productId) => {
        const isExists = cart?.filter(
            (product) => product.productId._id === productId
        );
        return isExists?.length > 0;
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
                addItemToCart,
                removeItemFromCart,
                fetchProduct,
                getProductById,
                fetchWishlist,
                fetchCart,
                isExistInWishlist,
                isExistInCart,
                deleteItemFromCart,
                addItemWithQuantityToCart,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
