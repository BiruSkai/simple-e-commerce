import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, Container, Button } from '@mui/material';


const Login = () => {
        const container = {
                margin:"50px", 
                padding:"50px", 
                display:"block",
                alignItem:"center",
                justifyContent:"center",
        }

        const login_separator = {
                display: "flex",
                alignItems: "center",
                margin: "100px"
        }

        return ( 
                <Container sx={container}>
                        <Typography variant="h4" component="h3" display="block">Login</Typography>
                        <hr/>  
                        <Container sx={login_separator}>
                                <Box
                                        component="form"
                                        sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                        '& .MuiBox-root css-1m34v2y': { ml:2 },
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
                                                        label="Email"
                                                        defaultValue=""
                                                />
                                        </div>
                                        <div>
                                                <TextField
                                                        id="outlined-required"
                                                        label="Password"
                                                        defaultValue=""
                                                />
                                        </div>
                                        <Button variant="contained" sx={{margin:"10px"}}>Login</Button>
                                </Box>
                                <Box
                                        component="form"
                                        sx={{
                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
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
                                                        label="Email"
                                                        defaultValue=""
                                                />
                                        </div>
                                        <div>
                                                <TextField
                                                        id="outlined-required"
                                                        label="Password"
                                                        defaultValue=""
                                                />
                                        </div>
                                        <Button variant="contained" sx={{margin:"10px"}}>Login</Button>
                                </Box>
                        </Container> 

                </Container>
         );
}
 
export default Login;