import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentUserStatus } from "../../features/users/usersSlice";
import { selectCart, selectFetchCurrentCartStatus, selectNeedsCheckoutRedirect } from "../../features/cart/cartSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAllProducts, selectFetchAllProductsStatus } from "../../features/products/productsSlice";
import { fetchCustomerOrders, selectFetchCustomerOrdersStatus } from "../../features/orders/ordersSlice";

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
        
        return ( 
                
         );
}
 
export default GoogleLogin;