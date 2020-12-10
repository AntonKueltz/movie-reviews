// React
import { useState } from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { useAuth } from '../auth';
import { config } from '../config';

const useStyles = makeStyles((theme) => ({
    button: {
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 10,
    },
    inputField: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

export default function NewReviewForm(props) {
    const { token } = useAuth();

    // movie form input
    const [movieName, setMovieName] = useState("");
    const [year, setYear] = useState(null);
    const [coverUrl, setCoverUrl] = useState("");

    // review form input
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [rating, setRating] = useState(null);

    const classes = useStyles();

    function callCreateReviewApi(event) {
        event.preventDefault();
        props.close();

        const formData = {
            movie: {
                name: movieName,
                year: parseInt(year),
                cover: coverUrl,
                links: {},
                places_to_watch: []
            },
            title,
            body,
            rating,
        }

        fetch(`${config.API_URL}/reviews/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(formData),
        }).then(
            response => response.json()
        ).then(
            data => {
                console.log(data);
                props.close();
                window.location.reload(false);
            }
        );
    }

    return (
        <form noValidate autoComplete="off" onSubmit={callCreateReviewApi}>
            <TextField
                value={movieName}
                onChange={event => setMovieName(event.target.value)}
                label="Movie Name"
                margin="normal"
                variant="outlined"
                className={classes.inputField}
            />
            <TextField
                value={year}
                onChange={event => setYear(event.target.value)}
                label="Year Released"
                margin="normal"
                variant="outlined"
                className={classes.inputField}
            />
            <TextField
                value={coverUrl}
                onChange={event => setCoverUrl(event.target.value)}
                label="Cover URL"
                margin="normal"
                variant="outlined"
                className={classes.inputField}
            />

            <TextField
                value={title}
                onChange={event => setTitle(event.target.value)}
                label="Review Title"
                margin="normal"
                variant="outlined"
                className={classes.inputField}
            />
            <TextField
                value={body}
                onChange={event => setBody(event.target.value)}
                label="Review Text"
                fullWidth
                margin="normal"
                variant="outlined"
                multiline
                rows={10}
                rowsMax={25}
                className={classes.inputField}
            />
            <FormControl variant="outlined" className={classes.inputField}>
                <InputLabel id="rating-input">Rating</InputLabel>
                <Select
                    labelId="rating-input"
                    value={rating}
                    onChange={event => setRating(event.target.value)}
                    margin="normal"
                >
                    <MenuItem value={null}>
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={0.0}>0</MenuItem>
                    <MenuItem value={0.5}>0.5</MenuItem>
                    <MenuItem value={1.0}>1</MenuItem>
                    <MenuItem value={1.5}>1.5</MenuItem>
                    <MenuItem value={2.0}>2</MenuItem>
                    <MenuItem value={2.5}>2.5</MenuItem>
                    <MenuItem value={3.0}>3</MenuItem>
                    <MenuItem value={3.5}>3.5</MenuItem>
                    <MenuItem value={4.0}>4</MenuItem>
                    <MenuItem value={4.5}>4.5</MenuItem>
                    <MenuItem value={5.0}>5</MenuItem>
                </Select>
            </FormControl>

            <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.button}
            >
                Add New Review
            </Button>
        </form>
    )
}