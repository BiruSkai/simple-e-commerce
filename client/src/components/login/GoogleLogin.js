import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, isLoggedInUpdated, selectCurrentUser, selectCurrentUserStatus } from "../../features/users/usersSlice";
import { fetchCurrentCart, needsCheckoutRedirectUpdated, selectCart, selectFetchCurrentCartStatus, selectNeedsCheckoutRedirect } from "../../features/cart/cartSlice";
import { useHistory } from "react-router-dom";
import { fetchAllProducts, selectFetchAllProductsStatus } from "../../features/products/productsSlice";
import { fetchCustomerOrders, selectFetchCustomerOrdersStatus } from "../../features/orders/ordersSlice";
import { useEffect, useState } from "react";

const GoogleLogin = () => {
        const user = useSelector(selectCurrentUser)
        const userStatus = useSelector(selectCurrentUserStatus)
        const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect)
        const dispatch = useDispatch()
        const cartContents = useSelector(selectCart)
        const history = useHistory()
        const fetchAllProductsStatus = useSelector(selectFetchAllProductsStatus)
        const fetchCurrentCartStatus = useSelector(selectFetchCurrentCartStatus)
        const fetchCustomerOrderStatus = useSelector(selectFetchCustomerOrdersStatus)
        const [loginMsg, setLoginMsg] = useState("")

        // Get user data to redux store after signing in with Google
        useEffect(() => {
                if (userStatus == "idle") {
                        dispatch(fetchCurrentUser())
                        dispatch(fetchCurrentCart(cartContents))
                        dispatch(fetchCustomerOrders())
                        dispatch(fetchAllProducts())
                }
        }, [userStatus, dispatch, history, cartContents])

        useEffect(() => {
                if (userStatus == "failed") {
                        setLoginMsg("An error occurred logging in using Google")
                }
        }, [userStatus])

        // Ask for address if not in the database, otherwise redirect to main site
        useEffect(() => {
                if (userStatus === "succeeded" &&
                        fetchAllProductsStatus === "succeeded" &&
                        fetchCurrentCartStatus === "succeeded" &&
                        fetchCustomerOrderStatus === "succeeded"
                ) {
                        //Set log-in status
                        dispatch(isLoggedInUpdated(true))
                        if (user.address) {
                                // Check if we need to redirect back to checkout process
                                if (needsCheckoutRedirect) {
                                        dispatch(needsCheckoutRedirectUpdated(false))
                                        history.push("/checkout")
                                } else {
                                        history.push("/google-login/user-register")
                                }
                        }
                }
        }, [userStatus, user.address, dispatch, history, needsCheckoutRedirect, fetchAllProductsStatus, fetchCurrentCartStatus, fetchCustomerOrderStatus])
        
        return ( 
                <div>
                        <p>
                                {loginMsg}
                        </p>
                </div>
         );
}
 
export default GoogleLogin;