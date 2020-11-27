// React
import { useEffect, useState } from 'react';

// Material UI
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import ReviewCard from './ReviewCard'

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        maxWidth: 1000,
    }
});

export default function ReviewIndex(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [summaries, setSummaries] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        fetch("http://localhost:8000/reviews/")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true);
                setSummaries(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container className={classes.root}>
                {summaries.map((summary, i) => 
                    <ReviewCard key={i} { ...summary } />
                )}
            </Container>
        );
    }
}