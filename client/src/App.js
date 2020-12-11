// React
import { useState } from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Modal from '@material-ui/core/Modal';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { AuthContext } from './auth';
import LoginForm from './components/LoginForm';
import NavOptions from './components/NavOptions';
import ReviewIndex from './components/ReviewIndex';
import NewReviewForm from './components/NewReviewForm';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  loginModal: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    height: 200,
    backgroundColor: theme.palette.primary.main,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  newReviewModal: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.primary.main,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  document.body.style.margin = "0";
  document.body.style.backgroundColor = "#222222";

  // state management for login modal
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  function openLoginModal() { setLoginModalOpen(true); }
  function closeLoginModal() { setLoginModalOpen(false); }

  // state management for new review modal
  const [isNewReviewModalOpen, setNewReviewModalOpen] = useState(false);
  function openNewReviewModal() { setNewReviewModalOpen(true); }
  function closeNewReviewModal() { setNewReviewModalOpen(false); }

  // auth management
  const currentToken = localStorage.getItem("token");
  const [authToken, setAuthToken] = useState(currentToken);

  function setToken(token) {
    setAuthToken(token);
    localStorage.setItem("token", token);
  }

  return (
    <div className={classes.root}>
      <AuthContext.Provider value={{ token: authToken, setToken }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="h6" className={classes.title}>
              Shitty Movie Reviews
            </Typography>

            <NavOptions openLoginModal={openLoginModal} openNewReviewModal={openNewReviewModal} />
      
          </Toolbar>
        </AppBar>

        <Modal
          className={classes.loginModal}
          onClose={closeLoginModal}
          open={isLoginModalOpen && !isNewReviewModalOpen}
        >
          <LoginForm close={closeLoginModal} />
        </Modal>

        <Modal
          className={classes.newReviewModal}
          onClose={closeNewReviewModal}
          open={isNewReviewModalOpen && !isLoginModalOpen}
        >
          <NewReviewForm close={closeNewReviewModal} />
        </Modal>

        <ReviewIndex className={classes.root} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
