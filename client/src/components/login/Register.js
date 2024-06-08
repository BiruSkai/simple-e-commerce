import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Countries from './Countries';
import { Typography, Container, Button } from '@mui/material';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import Datepickers from '../subcomponents/Datepickers';
      

const Register = () => {
        const container = {
                margin:"50px", 
                padding:"50px", 
                display:"block",
                alignItem:"center",
                justifyContent:"center",
        }

        const { register, handleSubmit, formState, watch } = useForm();

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
                        >
                       
                        <div>
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="First Name"
                                        defaultValue=""
                                        name="fname"
                                        ref={register({
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
                                        ref={register({
                                                required:true,
                                                maxLength:20
                                        })}
                                />
                                {formState.errors.lname?.type === "maxLength" && "Last name max 20 characters."}
                                {formState.errors.lname?.type === "required" && "Last name is required"}
                        </div>

                        <Datepickers 
                                ref={register({
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
                                        ref={register({
                                                require:true,
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
                                        ref={register({
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
                                ref={register({
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
                                ref={register({
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
                                ref={register({
                                        required:true,
                                        maxLength:20
                                })}
                        />
                        {formState.errors.province?.type === "maxLength" && "Province max 20 characters."}
                        {formState.errors.province?.type === "required" && "Province is required"}
                
                        <Countries />
                        <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                type="email"
                                defaultValue=""
                                name="email"
                        ref={register({
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
                                        ref={register({
                                                required:true,
                                                minLength:6,
                                                maxLength:20
                                        })}
                                />
                                {formState.errors.password?.type === "minLength" && "Password max 6 characters."}
                                {formState.errors.password?.type === "maxLength" && "Password max 30 characters."}
                                {formState.errors.password?.type === "required" && "Password is required"}
                        
                                <TextField
                                        requireda
                                        id="outlined-required"
                                        label="Repeat password"
                                        type="password"
                                        defaultValue=""
                                        name="repeat_password"
                                        ref={register({
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