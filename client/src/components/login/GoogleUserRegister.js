import { useForm } from "ract-hook-form"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { selectCurrentUserStatus } from "../../features/users/usersSlice"
import { selectNeedsCheckoutRedirect } from "../../features/cart/cartSlice"


const GoogleUserRegister = () => {
        const { register, handleSubmit, formState } = useForm()
        const history = useHistory()
        const dispatch = useDispatch()
        const user = useSelector(selectCurrentUser)
        const userStatus = useSelector(selectCurrentUserStatus)
        const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect)
        const [isUserUpdated, setIsUserUpdated] = useState(false)

        const handleUpdateUser = async data => {
                try {
                        await apiAxios.put("/users/self", {
                                first_name: user.fname,
                                last_name: user.lname,
                                birthdate: user.birthdate,
                                address: data.address,
                                number: data.number,
                                postcode: data.postcode,
                                city: data.city,
                                country: data.country,
                        })
                        dispatch(fetchCurrentUser())
                        setIsUserUpdated(true)
                } catch (err) {
                        if (err) {
                                console.log(err)
                        }
                }
        }

        return ( 

         );
}
 
export default GoogleUserRegister;