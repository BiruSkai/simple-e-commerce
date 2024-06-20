import apiAxios from "../../config/axiosConfig";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchAllProducts = createAsyncThunk("products/fetchAllProducts", async () => {
        const response = await apiAxios.get("/products");
        const products = {};
        response.data.forEach(product => products[product.id] = product);
        return products;
});

export const productsSlice = createSlice({
        name: "products",
        intialState: {
                fetchAllProductsStatus: "idle",
                allProducts: {}
        },
        extraReducers: (builder) => {
                // Reducers for fetching products
                builder
                        .addCase(fetchAllProducts.pending, (state, action) => {
                                state.fetchAllProductsStatus = "loading"
                        })
                        .addCase(fetchAllProducts.fulfilled, (state, action) => {
                                state.fetchAllProductsStatus = "succeeded"
                        })
                        .addCase(fetchAllProducts.rejected, (state, action) => {
                                state.fetchAllProductsStatus = "failed"
                        })
        }
})

export const selectAllProducts = state => state.products.allProducts;
export const selectProductById = (state, productId) => state.products.allProducts["productId"];
export const selectFetchAllProductsStatus = state => state.products.fethAllProductsStatus;

export default productsSlice.reducer;