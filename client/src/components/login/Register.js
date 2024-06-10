import { Typography, Container, Button, Box, TextField, Alert } from '@mui/material';
import Countries from "./Countries";
import Datepickers from '../subcomponents/Datepickers';
import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom';
import { fetchCurrentUser, isLoggedInUpdated, selectCurrentUserStatus } from "../../features/users/usersSlice";
import { fetchCurrentCart, selectCart, selectNeedsCheckoutRedirect, selectFetchCurrentCartStatus, needsCheckoutRedirectUpdated } from "../../features/cartSlice";
import { fetchCustomerOrders, selectFetchCustomerOrdersStatus } from "../../features/orders/ordersSlice"
import apiAxios from '../../config/axiosConfig';


const Register = () => {
        const container = {
                margin:"50px", 
                padding:"50px", 
                display:"block",
                alignItem:"center",
                justifyContent:"center",
        }

        const { register, handleSubmit, formState, watch } = useForm();
        const history = useHistory();
        const dispatch = useDispatch();
        const password = useRef({});
        password.current = watch("password", "");
        const [errMsg, setErrMsg] = useState("");
        const [isLoginDone, setIsLoginDone] = useState(false);
        const userStatus = useSelector(selectCurrentUserStatus);
        const fetchCurrentCartStatus = useSelector(selectFetchCurrentCartStatus);
        const fetchCustomerOrdersStatus = useSelector(selectFetchCustomerOrdersStatus);
        const needsCheckoutRedirect = useSelector(selectNeedsCheckoutRedirect);
        const cartContents = useSelector(selectCart);

        const handleRegisterUser = async(data) => {
                console.log("data:", data)
                try {
                        await apiAxios.post(
                                "/auth/sign_up", 
                                {
                                        first_name: data.fname,
                                        last_name: data.lname,
                                        birthdate: data.birthdate,
                                        address: data.address,
                                        number: data.number,
                                        postcode: data.postcode,
                                        city: data.city,
                                        country: data.country,
                                        email: data.email,
                                        password: data.password
                                }
                        )
                        const loginResponse = await apiAxios.post(
                                "auth/login",
                                {
                                        email: data.email,
                                        password: data.password
                                },
                                {withCredentials: true}
                        )
                        if (loginResponse.status === 200) {
                                setErrMsg("");
                                dispatch(isLoggedInUpdated(true));
                                dispatch(fetchCurrentUser());
                                dispatch(fetchCurrentCart(cartContents));
                                dispatch(fetchCustomerOrders());
                                setIsLoginDone(true);
                        }
                } catch (err) {
                        if (err.response) {
                                console.log(err.response.data)
                                setErrMsg(err.response.data)
                        } else if (err.request) {
                                console.log(err.request.data)
                        }
                        else {
                                console.log("An error occured creating an account or logging")
                        }
                }
        }

        // When login data is fetchCustomerOrders, redirect to main site or checkout
        useEffect(() => {
                if (    userStatus === "succeeded" &&
                        fetchCurrentCartStatus === "succeeded" &&
                        fetchCustomerOrdersStatus === "succeeded" &&
                        isLoginDone) {
                                // Check if we need to redirect back to checkout process
                                if (needsCheckoutRedirect) {
                                        dispatch(needsCheckoutRedirectUpdated(false))
                                        history.push("/checkout")
                                } else {
                                        history.push("/")
                                }
                        }
        }, [userStatus, needsCheckoutRedirect, fetchCurrentCartStatus, fetchCustomerOrdersStatus, isLoginDone, dispatch, history]);

        return ( 
                <Container sx={container}>
                        <Typography variant="h4" component="h3" display="block">Registration Form</Typography>
                        <hr/>
                        <Box
                                component="form"
                                sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        '.MuiInputBase-input': {height:'8px'},
                                        padding:"20px",
                                        backgroundColor:"cornsilk",
                                        width:"fit-content",
                                        borderRadius:"5%"
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit(handleRegisterUser)}
                        >
                       
                       { errMsg && <Alert severity="info">{ errMsg }</Alert> }
                        <div>
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="First Name"
                                        defaultValue=""
                                        name="fname"
                                        {...register("fname",{
                                                required:true,
                                                maxLength:20
                                        })}
                                />
                                {formState.errors.fname?.type === "required" && "First name is required"}
                                {formState.errors.fname?.type === "maxLength" && "First name max 20 characters."}
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="Last Name"
                                        defaultValue=""
                                        name="lname"
                                        {...register("lname", {
                                                required:true,
                                                maxLength:20
                                        })}
                                />
                                {formState.errors.lname?.type === "maxLength" && "Last name max 20 characters."}
                                {formState.errors.lname?.type === "required" && "Last name is required"}
                        </div>

                        <Datepickers 
                                {...register("birthdate", {
                                        required:true
                                })}
                        />
                        {formState.errors.birthdate?.type === "required" && "Birthdate must be filled"}
                       

                        <div>
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="Address"
                                        defaultValue=""
                                        name="address"
                                        {...register("address", {
                                                required:true,
                                                maxLength:20
                                        })}
                                />
                                {formState.errors.address?.type === "maxLength" && "Address max 20 characters."}
                                {formState.errors.address?.type === "required" && "Address is required"}
                        
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="Number"
                                        defaultValue=""
                                        name="number"
                                        {...register("number", {
                                                required:true,
                                                maxLength:4
                                        })}
                                />
                                {formState.errors.number?.type === "maxLength" && "Address number max 4 characters."}
                                {formState.errors.number?.type === "required" && "Address number is required"}
                                
                        </div>
        
                        <TextField
                                required
                                id="outlined-required"
                                label="Postcode"
                                defaultValue=""
                                name="postcode"
                                {...register("postcode", {
                                        required:true,
                                        maxLength:8
                                })}
                        />
                        {formState.errors.postcode?.type === "maxLength" && "Postcode max 8 characters."}
                        {formState.errors.postcode?.type === "required" && "Postcode is required"}
                        
                        <TextField
                                required
                                id="outlined-required"
                                label="City"
                                defaultValue=""
                                name="city"
                                {...register("city", {
                                        required:true,
                                        maxLength:20
                                })}
                        />
                        {formState.errors.city?.type === "maxLength" && "City max 20 characters."}
                        {formState.errors.city?.type === "required" && "City is required"}
                    
                        <TextField
                                required
                                id="outlined-required"
                                label="Province"
                                defaultValue=""
                                name="province"
                                {...register("province", {
                                        required:true,
                                        maxLength:20
                                })}
                        />
                        {formState.errors.province?.type === "maxLength" && "Province max 20 characters."}
                        {formState.errors.province?.type === "required" && "Province is required"}
                
                        <Countries 
                                {...register("country", {
                                        required:true
                                })}
                        />
                        {formState.errors.province?.type === "required" && "Province is required"}

                        <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                type="email"
                                defaultValue=""
                                name="email"
                        {...register("email", {
                                        required:"Email is required",
                                        maxLength:30,
                                        pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address hello"
                                        }
                                })}
                        />
                        {formState.errors.email && formState.errors.email.message}
                        {formState.errors.email?.type === "maxLength" && "Email max 30 characters"}

                        <div>
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="Password"
                                        type="password"
                                        defaultValue=""
                                        name="password"
                                        {...register("password", {
                                                required:true,
                                                minLength:6,
                                                maxLength:20
                                        })}
                                />
                                {formState.errors.password?.type === "minLength" && "Password max 6 characters."}
                                {formState.errors.password?.type === "maxLength" && "Password max 30 characters."}
                                {formState.errors.password?.type === "required" && "Password is required"}
                        
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="Repeat password"
                                        type="password"
                                        defaultValue=""
                                        name="repeat_password"
                                        {...register("repeat_password", {
                                                validate: value =>
                                                        value === password.current || "Password not match."
                                        })} />
                                { formState.errors.repeat_password?.type === "validate" && "Password not match."}
                        </div>

                        <Button variant="contained" sx={{margin:"10px"}}>Submit</Button>
                        <Link to="/login">
                                <Button variant="outlined">Go to Log-In page</Button>
                        </Link>
                        </Box>
                        
                </Container>
         );
}
 
export default Register;