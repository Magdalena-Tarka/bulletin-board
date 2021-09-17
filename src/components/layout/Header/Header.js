import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUserStatus, getUserNickname, setUserStatus } from '../../../redux/userRedux';

import styles from './Header.module.scss';
import { Button } from '../../common/Button/Button';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import GestureIcon from '@material-ui/icons/Gesture';

const useStyles = makeStyles(() => ({
  icon: {
    width: 0,
    height: 0,
    position: 'absolute',
  },
}));

const Component = ({ className, userStatus, userNickname, setUserStatus, ...props }) => {
  const classes = useStyles();

  return (
    <div className={clsx(className, styles.root)}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={styles.top_buttons}
      >
        <Button
          className={styles.btn_loggedIn}
          variant="transparent"
          value="is loggedIn"
          onClick={() => setUserStatus('is loggedIn')}
        >
          Logged In
        </Button>
        <Button
          className={styles.btn_loggedOut}
          variant="transparent"
          value="is loggedOut"
          onClick={() => setUserStatus('is loggedOut')}
        >
          Logged Out
        </Button>
        <Button
          className={styles.btn_admin}
          variant="transparent"
          value="is admin"
          onClick={() => setUserStatus('is admin')}
        >
          Admin
        </Button>
      </Grid>

      <AppBar position="static">
        <Toolbar className={styles.navbar}>
          <IconButton
            className={styles.logo_icon}
            component={Link}
            to={'/'}
          >
            <GestureIcon />
          </IconButton>

          <Typography
            className={styles.logo}
            variant="h6"
          >
            <Link to={'/'}>
              Bulletin Board
            </Link>
          </Typography>

          {userStatus === 'is loggedOut' ? (
            <div className={styles.right_buttons}>
              <Button
                className={styles.btn_login}
                variant="filled"
                color="inherit"
                onClick={() => setUserStatus('is loggedIn')}
              >Log In</Button>
            </div>) : (

            <div className={styles.right_buttons}>
              <Button
                className={styles.btn_yourPosts}
                variant="filled"
                color="inherit"
                component={Link}
                to={`/post/${userNickname}/posts`}
              >Your Posts</Button>
              <Button
                className={styles.btn_login}
                variant="filled"
                color="inherit"
                onClick={() => setUserStatus('is loggedOut')}
              >Log Out</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <svg className={classes.icon} aria-hidden="true" focusable="false">
        <linearGradient id="gradient" x2="2" y2="1">
          <stop offset="0%" className={styles.stop1} />
          <stop offset="50%" className={styles.stop2} />
          <stop offset="100%" className={styles.stop3} />
        </linearGradient>
      </svg>
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  userStatus: PropTypes.string,
  userNickname: PropTypes.string,
  setUserStatus: PropTypes.func,
};


const mapStateToProps = state => ({
  userStatus: getUserStatus(state),
  userNickname: getUserNickname(state),
});

const mapDispatchToProps = dispatch => ({
  setUserStatus: userStatus => dispatch(setUserStatus(userStatus)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Header,
  Container as Header,
  Component as HeaderComponent,  // w testach będziemy używać HeaderComponent
};
