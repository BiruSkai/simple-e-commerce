import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "../../config/axiosConfig";

export const fetchCurrentCart = createAsyncThunk("cart/fetchCurrentCart", async (loggedOutCart) => {
        const response = await apiAxios.post("/carts/self",
                {
                        cart: loggedOutCart
                }
        )
        const cart = {}
        response.data.forEach(cartProduct => 
                cart[cartProduct.product.id] = {
                        quantity: cartProduct.quantity
                }
        )
        return cart
});

export const addProductToCart = createAsyncThunk(
        "cart/addProductToCart",
        async (cartProduct, {getState}) => {
                if (getState().users.isLoggedIn) {
                        await apiAxios.post("/cart/self/product", cartProduct)
                }
                return cartProduct
        }
);

export const removeProductFromCart = createAsyncThunk(
        "cart/removeProductFromCart",
        async (product, {getState}) => {
                if (getState().users.isLoggedIn) {
                        await apiAxios.delete("/carts/self/product",
                                {data: product}
                        )
                }
                return product
        }
);

export const changeProductQuantity = createAsyncThunk(
        "cart/changeProductQuantity",
        async (product, {getState}) => {
                if (getState().users.isLoggedIn) {
                        await apiAxios.put("/carts/self/product", product)
                }
                return product
        }
);

export const checkoutCart = createAsyncThunk(
        "cart/checkoutCart", async () => {
                const response = await apiAxios.post("/carts/self/checkout")
                return response.data
        }
);

export const cartSlice = createSlice({
        name: "cart",
        initialState: {
                cartProducts: {},
                fetchCurrentCartStatus: "iddle",
                addProductToCartStatus: "iddle",
                removeProductFromCartStatus: "iddle",
                changeProductQuantityStatus: "iddle",
                checkoutCartStatus: "iddle",
                needsCheckoutRedirect: false,
                productAddedMsg: "Slice: Product Added",
                showProductAddedMsg: false
        },
        reducers: {
                
        }

})