import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiAxios from "../../config/axiosConfig";


export const fetchCustomerOrders = createAsyncThunk("orders/fetchCustomerOrders", async () => {
        const response = await apiAxios.get("/orders/self");
        const orders = {};
        response.data.forEach(orderProduct => {
                if (!orders[orderProduct.order_id]) {
                        orders[orderProduct.order_id] = {}
                }
                print("ordersSlice: ", orderProduct)
                orders[orderProduct.order_id][orderProduct.product_id] = orderProduct
        })
        return orders
})

export const ordersSlice = createSlice({
        name: "orders",
        initialState: {
                customerOrders: {},
                fetchCustomerOrdersStatus: "idle"
        },
        // Clear cart when logging out
        reducers: {
                customerOrdersUpdated(state, action) {
                        state.customerOrders = action.payload
                }
        },
        extraReducers: (builder) => {
                // Reducers for fetching orders
                builder 
                        .addCase(fetchCustomerOrders.pending, (state, action) => {
                                state.fetchCustormerOrdersStatus = "loading"
                        })
                        .addCase(fetchCustomerOrders.fulfilled, (state, action) => {
                                state.fetchCustormerOrdersStatus = "succeeded"
                        })
                        .addCase(fetchCustomerOrders.rejected, (state, action) => {
                                state.fetchCustormerOrdersStatus = "failed"
                        })
        }
});

export const { customerOrdersUpdated } = ordersSlice.actions;
export const selectCustomerOrders = state => state.orders.customerOrders;
export const selectFetchCustomerOrdersStatus = state => state.orders.fetchCustomerOrdersStatus;
export const selectOrderById = (state, orderId) => state.orders.customerOrders[orderId];
export default ordersSlice.reducer;