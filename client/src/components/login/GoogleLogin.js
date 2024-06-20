import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentUserStatus } from "../../features/users/usersSlice";
import { selectCart, selectNeedsCheckoutRedirect } from "../../features/cart/cartSlice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const GoogleLogin = () => {
        const user = useSelector(selectCurrentUser)
        const userStatus = useSelector(selectCurrentUserStatus)
        const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect)
        const dispatch = useDispatch()
        const cartContents = useSelector(selectCart)
        const history = useHistory()
        

        return ( 

         );
}
 
export default GoogleLogin;