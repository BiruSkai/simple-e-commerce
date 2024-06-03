import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Countries from './Countries';
import { Typography, Container, Button } from '@mui/material';
      

const Register = () => {
        const container = {
                margin:"50px", 
                padding:"50px", 
                display:"block",
                alignItem:"center",
                justifyContent:"center",
        }

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
                                />
                                <TextField
                                        id="outlined-required"
                                        label="Last Name"
                                        defaultValue=""
                                />
                        </div>
        
                        <TextField
                                required
                                id="outlined-required"
                                label="Birthdate"
                                defaultValue=""
                        />
                        <div>
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="Address"
                                        defaultValue=""
                                />
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="Number"
                                        defaultValue=""
                                />
                        </div>
        
                        <TextField
                                required
                                id="outlined-required"
                                label="Postcode"
                                defaultValue=""
                        />
                        <TextField
                                required
                                id="outlined-required"
                                label="City"
                                defaultValue=""
                        />
                        <TextField
                                required
                                id="outlined-required"
                                label="Province"
                                defaultValue=""
                        />
                        <Countries />
                        <TextField
                                required
                                id="outlined-required"
                                label="Email"
                                type="email"
                                defaultValue=""
                        />
                        <div>
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="Password"
                                        type="password"
                                        defaultValue=""
                                />
                                <TextField
                                        required
                                        id="outlined-required"
                                        label="Retype password"
                                        type="password"
                                        defaultValue=""
                                />
                        </div>
                        <Button variant="contained" sx={{margin:"10px"}}>Submit</Button>
                        </Box>
                </Container>
         );
}
 
export default Register;