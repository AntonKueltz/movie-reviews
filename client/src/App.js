// Material UI
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ReviewIndex from './components/ReviewIndex';

const useStyles = makeStyles({
  title: {
      flexGrow: 1,
      textAlign: "center",
  },
});

function App() {
  const classes = useStyles();
  document.body.style.margin = "0";
  document.body.style.backgroundColor = "#e0e0e0";

  return (
    <div className={classes.root}>      
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h6" className={classes.title}>
            Shitty Movie Reviews
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <ReviewIndex className={classes.root} />
    </div>
  );
}

export default App;
