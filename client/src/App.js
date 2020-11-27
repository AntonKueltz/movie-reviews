// Material UI
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ReviewIndex from './components/ReviewIndex';

const useStyles = makeStyles({
  title: {
      textAlign: "center",
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" component="h2" className={classes.title}>
        Shitty Movie Reviews
      </Typography>
      <ReviewIndex className={classes.root} />
    </div>
  );
}

export default App;
