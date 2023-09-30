import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import LoginDialog from './LoginDialog';
import cookie from "react-cookies";
import { JWT_COOKIE_NAME } from '../constant';

export default function MenuBar() {

    let hasLoggedIn = !!cookie.load(JWT_COOKIE_NAME);
    let bottonText = hasLoggedIn ? "Logout" : "Login"


    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {

        if (hasLoggedIn) {
            cookie.remove(JWT_COOKIE_NAME);
            window.location.reload();
        } else {
            setOpen(true);
        }

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Coures Enrollment System
                    </Typography>

                    <Button color="inherit" component={Link} to="/" > All Coureses</Button>
                    <Button color="inherit" component={Link} to="enrolledCourses">Enrolled Coureses</Button>
                    <Button color="inherit" onClick={handleClickOpen}>{bottonText}</Button>

                </Toolbar>
            </AppBar>
            <LoginDialog open={open} handleClose={handleClose} />
        </Box>
    );
}
