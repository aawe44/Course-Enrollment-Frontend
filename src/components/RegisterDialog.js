import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from "@mui/material";
import { AuthService } from "../service/AuthService";
import { useRef, useState } from "react";

export default function RegisterDialog(props) {
    const [error, setError] = useState("");
    const [username, password, email, firstname, lastname] = [useRef(), useRef(), useRef(), useRef(), useRef()];

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Register as a Student"}
                </DialogTitle>
                <DialogContent>
                    <TextField id="standard-basic" required label="Username" variant="standard" fullWidth autoFocus inputRef={username} />
                    <TextField id="standard-basic" required label="Password" variant="standard" type={"password"} fullWidth inputRef={password} />
                    <TextField id="standard-basic" required label="Email" variant="standard" type={"email"} fullWidth inputRef={email} />
                    <TextField id="standard-basic" label="Firstname" variant="standard" fullWidth inputRef={firstname} />
                    <TextField id="standard-basic" label="Lastname" variant="standard" fullWidth inputRef={lastname} />
                    <DialogContentText id="alert-dialog-description" style={{ "color": "red" }}>
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={register}>Register</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

    function register() {
        //reset error message.
        if (!username.current.value || !password.current.value || !email.current.value) {
            //1. check if any of the required fields is missing
            setError("Please enter the required fields (username/password/email)!");
        } else if (!password.current.value.match(/(?=^.{4,100}$).*$/)) {
            //2. check password length
            setError("The Password length must be greater or equal to 4!")
        } else if (!email.current.value.match(/.+@.+/)) {
            //3. check email format
            setError("Email format is not valid!");
        } else {
            const userInfo = {
                "login": username.current.value,
                "password": password.current.value,
                "email": email.current.value,
                "firstName": firstname.current.value,
                "lastName": lastname.current.value,
                "langKey": "en"
            }
            AuthService.register(userInfo).then(response => {
                //close the register dialog as registration has been successful.
                props.handleClose()
                alert("Thanks for the registration. Please check your email to activate your account!")
            }).catch(error => {
                console.error(error);
                // only case that would fail is username is already in use.
                setError("Sorry, this username is already in use! Please select another username.");
            })
        }
    }
}