import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchCurrentUser, selectCurrentUser, selectCurrentUserStatus } from "../../features/users/usersSlice"
import { needsCheckoutRedirectUpdated, selectNeedsCheckoutRedirect } from "../../features/cart/cartSlice"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import Countries from "./Countries"
import { useEffect, useState } from "react"
import apiAxios from "../../config/axiosConfig"


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

        //When user info is updated, redirect to main site or checkout
        useEffect(() => {
                if (userStatus === "succeeded" && isUserUpdated) {
                        //Check if we need to redirect back to checkout process
                        if (needsCheckoutRedirect) {
                                dispatch(needsCheckoutRedirectUpdated(false))
                                history.push("/checkout")
                        } else {
                                history.push("/")
                        }
                }
        }, [userStatus, dispatch, history, needsCheckoutRedirect, isUserUpdated])
        
        const container = {
                margin:"50px", 
                padding:"50px", 
                display:"block",
                alignItem:"center",
                justifyContent:"center",
        }
        
        
        return ( 
                <Container sx={container}>
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
                                onSubmit={handleSubmit(handleUpdateUser)}
                        >
                                <Typography variantMapping="p">
                                       Google Email: {user.email}
                                </Typography>
                                <Typography variantMapping="p">
                                       Name: {user.first_name} {user.last_name}
                                </Typography>
                                <Typography variantMapping="p">
                                       Please enter contact info below:
                                </Typography>

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
                                {formState.errors.country?.type === "required" && "Country is required"}
                                
                                <Button variant="contained" sx={{margin:"10px"}}>Submit</Button>
                        </Box>
                </Container>

         );
}
 
export default GoogleUserRegister;