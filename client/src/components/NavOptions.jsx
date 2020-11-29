// React
import { Fragment, useState } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { getUsernameFromToken, useAuth } from '../auth';

export default function NavOptions(props) {
    const { token, setToken } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    const logout = () => {
        setToken(null);
        handleClose();
    }

    const loginButton = <Button 
        color="inherit"
        onClick={props.openLoginModal}
    >
        Login
    </Button>;

    const loggedInMenu = <Fragment>
        <Button
            onClick={handleClick}
            color="inherit"
        >
            {getUsernameFromToken(token)}
        </Button>
        <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
    </Fragment>

    /* show login button if not logged in, otherwise show username */
    return token ? loggedInMenu : loginButton;
}