// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.light,
        display: "flex",
        minWidth: 275,
        maxWidth: 450,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: "auto",
        marginRight: "auto",
    },
    cover: {
        width: 150,
        height: 225,
    },
}));

const stars = {
    0: [<StarBorderIcon />, <StarBorderIcon />, <StarBorderIcon />, <StarBorderIcon />, <StarBorderIcon />],
    0.5: [<StarHalfIcon />, <StarBorderIcon />, <StarBorderIcon />, <StarBorderIcon />, <StarBorderIcon />],
    1: [<StarIcon />, <StarBorderIcon />, <StarBorderIcon />, <StarBorderIcon />, <StarBorderIcon />],
    1.5: [<StarIcon />, <StarHalfIcon />, <StarBorderIcon />, <StarBorderIcon />, <StarBorderIcon />],
    2: [<StarIcon />, <StarIcon />, <StarBorderIcon />, <StarBorderIcon />, <StarBorderIcon />],
    2.5: [<StarIcon />, <StarIcon />, <StarHalfIcon />, <StarBorderIcon />, <StarBorderIcon />],
    3: [<StarIcon />, <StarIcon />, <StarIcon />, <StarBorderIcon />, <StarBorderIcon />],
    3.5: [<StarIcon />, <StarIcon />, <StarIcon />, <StarHalfIcon />, <StarBorderIcon />],
    4: [<StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />, <StarBorderIcon />],
    4.5: [<StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />, <StarHalfIcon />],
    5: [<StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />],
};
const defaultImg = "https://www.genius100visions.com/wp-content/uploads/2017/09/placeholder-vertical.jpg";

export default function ReviewCard(props) {
    const classes = useStyles();
    const coverImg = props.cover_img ? props.cover_img : defaultImg;

    return (
        <Card variant="outlined" className={classes.root}>
            <CardMedia
                className={classes.cover}
                component="img"
                src={coverImg}
                title={`${props.movie_name} Poster`}
            />
            <CardContent>
                <Typography component="h5" variant="h5">
                    {props.movie_name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {props.movie_year}
                </Typography>
                
                <Typography component="h6" variant="h6">
                    {props.review_title}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.trimmed_body}                    
                </Typography>
                {stars[props.rating].map((star, i) => star)}
            </CardContent>
        </Card>
    )
}