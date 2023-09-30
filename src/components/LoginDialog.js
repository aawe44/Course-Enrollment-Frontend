import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthService } from '../service/AuthService';

import cookie from "react-cookies";
import { JWT_COOKIE_NAME } from "../constant"

export default function LoginDialog(props) {
    
    const [errorMsg, setErrorMsg] = React.useState("");


    let username;
    let password;

    const login = () => {
        // login logic 
        AuthService.getJWT(username, password) //promise
            .then(response => {
                const jwt = response.data.id_token;

                // 把 JWT存在cookie 裡面(key-value pair的存)
                cookie.save(JWT_COOKIE_NAME, jwt);
                window.location.reload(); //refresh the page to activate the JWT

            }).catch(error => {

                console.error(error);
                setErrorMsg(String(error));

            })
    }

    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button> */}
            {/* <Dialog open={open} onClose={handleClose}> */}
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Please Enter Username and Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="username"
                        label="Username"
                        fullWidth
                        variant="standard"
                        // onChange={(event) => {
                        //     username = event.target.value
                        // }} // event => useranme = event.target.value
                        onChange={(event => username = event.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(event => password = event.target.value)}
                    />

                    <DialogContentText style={{ "color": "red" }}>
                        {errorMsg}
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={login}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
