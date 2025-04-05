import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { useSearchParams } from "react-router-dom";

const ProductContext = createContext();

const useProduct = () => useContext(ProductContext);
export default useProduct;

export function ProductProvider({ children }) {
    const ITEMSPERPAGE = 4;

    // Product related states
    const [productList, setProductList] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState();

    // Wishlist related states
    const [wishlist, setWishlist] = useState();
    const [wishlistTotalCount, setWishlistTotalCount] = useState(0);
    const [wishlistTotalPage, setWishlistTotalPage] = useState(1);

    // Cart related states
    const [cart, setCart] = useState();
    const [cartTotalCount, setCartTotalCount] = useState(0);

    // Order related states
    const [selectedOrder, setSelectedOrder] = useState();
    const [order, setOrder] = useState();
    const [addresses, setAddresses] = useState();

    // Loading related states
    const [loading, setLoading] = useState(false);
    const [actionLoader, setActionLoader] = useState(false);

    // Product filter related variables
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.getAll("category") || [];
    const priceFilter = parseInt(searchParams.get("price")) || 2500;
    const ratingFilter = parseFloat(searchParams.get("rating")) || undefined;
    const sortFilter = searchParams.get("sort") || undefined;
    const searchTextFilter = searchParams.get("searchText") || "";
    const pageFilter = parseInt(searchParams.get("page")) || 1;

    // Default filter values
    const defaultFilters = {
        category: [], // no categories selected
        price: 2500, // default price is 2500
        rating: undefined, // no rating filter, so leave it empty (or undefined)
        sort: undefined, // no sort filter
        searchText: "", // empty search
        page: 1,
    };
    const setFilters = (filters) => {
        setSearchParams((params) => {
            if (filters.category && filters.category.length > 0) {
                params.delete("category");
                filters.category.forEach((cat) => {
                    params.append("category", cat);
                });
                params.set("page", filters.page || 1);
            }
            if (filters.price !== undefined) {
                if (filters.price === "") {
                    params.delete("price");
                } else {
                    params.set("price", filters.price);
                }
                params.set("page", filters.page || 1);
            }
            if (filters.rating !== undefined) {
                if (filters.rating === "") {
                    params.delete("rating");
                } else {
                    params.set("rating", filters.rating);
                }
                params.set("page", filters.page || 1);
            }
            if (filters.sort !== undefined) {
                if (filters.sort === "") {
                    params.delete("sort");
                } else {
                    params.set("sort", filters.sort);
                }
                params.set("page", filters.page || 1);
            }
            if (filters.searchText !== undefined) {
                if (filters.searchText === "") {
                    params.delete("searchText");
                } else {
                    params.set("searchText", filters.searchText);
                }
                params.set("page", filters.page || 1);
            }
            if (filters.page !== undefined) {
                params.set("page", filters.page);
            }

            return params;
        });
    };

    const resetFilter = () => {
        setSearchParams((params) => {
            params.delete("category");
            params.delete("price");
            params.delete("rating");
            params.delete("sort");
            params.delete("searchText");
            params.delete("page");
            return params;
        });
    };

    // Fetch wishlisted and items added to cart for showing count on navbar
    async function initialLoad() {
        fetchWishlist();
        fetchCart();
    }

    useEffect(() => {
        initialLoad();
    }, []);

    // Productlist changes based on category
    const fetchProduct = async (url) => {
        setLoading(true);
        setSelectedProduct(null);
        setProductList(null);

        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setProductList(data.data);
                setTotalPages(Math.ceil(data.totalCount / ITEMSPERPAGE));
            })
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

    // Get all orders
    const fetchOrders = async () => {
        setLoading(true);
        await fetch(`http://localhost:5000/order/all`)
            .then((res) => res.json())
            .then((data) => setOrder(data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    // Get order with ID
    const getOrderWithId = async (orderId) => {
        setLoading(true);
        await fetch(`http://localhost:5000/order/${orderId}`)
            .then((res) => res.json())
            .then((data) => setSelectedOrder(data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    // Place order
    const placeOrder = async (orderDetails) => {
        setLoading(true);
        const postedOrder = await fetch(`http://localhost:5000/order/add`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(orderDetails),
        })
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.log(err));
        if (postedOrder) {
            await fetch(`http://localhost:5000/cart/all`, { method: "DELETE" });
        }
        setLoading(false);
        await fetchCart();
        await fetchWishlist();
    };

    // Fetch addresses
    const fetchAddress = async () => {
        setLoading(true);
        setAddresses(null);
        await fetch(`http://localhost:5000/address/all`)
            .then((res) => res.json())
            .then((data) => setAddresses(data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    // Add new address
    const addAddress = async (addressData) => {
        setLoading(true);

        const newAddresses = await fetch(`http://localhost:5000/address/add`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(addressData),
        })
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));

        setAddresses(newAddresses);
    };

    // Update address
    const updateAddress = async (addressId, newAddressData) => {
        setLoading(true);
        const newAddresses = await fetch(
            `http://localhost:5000/address/update/${addressId}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(newAddressData),
            }
        )
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.log(err));

        if (newAddresses) {
            setAddresses(newAddresses);
        } else {
            console.log("Error while adding to cart");
        }
        setLoading(false);
    };

    // Change primary address
    const changePrimaryAddress = async (addressId) => {
        setLoading(true);
        const newAddresses = await fetch(
            `http://localhost:5000/address/change/primaryAddress/${addressId}`,
            {
                method: "POST",
            }
        )
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.log(err));

        if (newAddresses) {
            setAddresses(newAddresses);
        } else {
            console.log("Error while adding to cart");
        }
        setLoading(false);
    };

    // Delete address
    const deleteAddress = async (addressId) => {
        setLoading(true);
        const deletedAddress = await fetch(
            `http://localhost:5000/address/delete/${addressId}`,
            {
                method: "DELETE",
            }
        )
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => console.log(err));
        if (deletedAddress) {
            const addressIndex = addresses?.findIndex(
                (address) => address._id === deletedAddress._id
            );
            const newAddresses = [...addresses];
            newAddresses.splice(addressIndex, 1);
            setAddresses(newAddresses);
        } else {
            console.log("Error while adding to cart");
        }
        setLoading(false);
    };

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
            setCartTotalCount((count) => count + 1);
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
            const newCount = cart.reduce(
                (acc, curr) => acc + curr.productCount,
                0
            );
            setCartTotalCount(newCount);
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
            setCartTotalCount((count) => count - 1);
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
            const deletedCartItem = cart.filter(
                (cartItem) => cartItem.productId._id == productId
            );
            const newCart = cart.filter(
                (cartItem) => cartItem.productId._id !== productId
            );
            setCart(newCart);
            setCartTotalCount(
                (count) => count - deletedCartItem[0].productCount
            );
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
                    setWishlistTotalCount((count) => count - 1);
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
                    setWishlistTotalCount((count) => count + 1);
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

    // Fetch wishlist
    const fetchWishlist = async (page = 1) => {
        setLoading(true);
        setWishlist(null);
        setWishlistTotalCount(0);
        setWishlistTotalPage(1);
        await fetch(`http://localhost:5000/wishlist/all?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                setWishlist(data.data);
                setWishlistTotalCount(data.totalCount);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    // Fetch cart
    const fetchCart = async (page = 1) => {
        setLoading(true);
        setCart(null);
        await fetch(`http://localhost:5000/cart/all?page=${page}`)
            .then((res) => res.json())
            .then((data) => {
                setCart(data.data);
                const newCount = data.data.reduce(
                    (acc, curr) => acc + curr.productCount,
                    0
                );
                setCartTotalCount(newCount);
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    };

    return (
        <ProductContext.Provider
            value={{
                productList,
                loading,
                selectedProduct,
                wishlist,
                cart,
                addresses,
                order,
                selectedOrder,
                defaultFilters,
                pageFilter,
                totalPages,
                wishlistTotalCount,
                cartTotalCount,
                searchParams,
                categoryFilter,
                priceFilter,
                ratingFilter,
                sortFilter,
                searchTextFilter,

                resetFilter,
                setFilters,
                initialLoad,
                getOrderWithId,
                fetchOrders,
                placeOrder,
                addAddress,
                updateAddress,
                deleteAddress,
                changePrimaryAddress,
                toggleCart,
                toggleWishList,
                addItemToCart,
                removeItemFromCart,
                fetchProduct,
                getProductById,
                fetchWishlist,
                fetchCart,
                fetchAddress,
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
