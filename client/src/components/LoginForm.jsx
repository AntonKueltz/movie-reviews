// React
import { useState } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../auth';
import { config } from '../config';

const useStyles = makeStyles({
    button: {
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 10,
    },
})

export default function LoginForm(props) {
    const { setToken } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const classes = useStyles();

    function callLoginApi(event) {
        event.preventDefault();

        // the FastAPI token boilerplate wants urlencoded form (yuck)
        let formData = `username=${username}&password=${password}`;

        fetch(`${config.API_URL}/auth/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData,
        }).then(
            response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Login failed");
                }
            }
        ).then(
            data => {
                // set the auth token
                setToken(data.access_token)
                props.close();
            }
        ).catch(
            err => console.log(err)
        );
    }

    return (
        <form noValidate autoComplete="off" onSubmit={callLoginApi}>
            <div>
                <TextField
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    label="Username"
                    fullWidth
                    margin="normal"
                /> 
                <TextField
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    fullWidth
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                >
                    Login
                </Button>
            </div>
        </form>
    );  
}