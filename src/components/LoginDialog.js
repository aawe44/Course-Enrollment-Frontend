import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AuthService } from '../service/AuthService';
import { Link, TextField } from "@mui/material";

import cookie from "react-cookies";
import { JWT_COOKIE_NAME } from "../constant"

export default function LoginDialog(props) {

    const [errorMsg, setErrorMsg] = React.useState("");

    let username;
    let password;

    const login = () => {

        AuthService.getJWT(username, password)
            .then(response => {

                const jwt = response.data.id_token;
                cookie.save(JWT_COOKIE_NAME, jwt);
                window.location.reload();

            }).catch(error => {

                console.error(error);
                setErrorMsg(String(error));

            })
    }

    return (
        <div>
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

                    <Link component="button"
                        variant="body2"
                        onClick={() => {
                            //close login dialog first
                            props.handleClose();
                            //open register dialog
                            props.handleRegisterOpen();
                        }}> {'Sign up'}
                    </Link>

                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={login}>Login</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
