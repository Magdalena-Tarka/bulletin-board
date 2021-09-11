import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

//import { connect } from 'react-redux';
//import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux';

import styles from './Header.module.scss';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
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

const Component = ({ className, children }) => {
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
        <Button className={styles.btn_LoggedIn}>Logged In</Button>
        <Button className={styles.btn_LoggedOut}>Logged Out</Button>
        <Button className={styles.btn_Admin}>Admin</Button>
      </Grid>
      <Container maxWidth="md">
        <AppBar position="static">
          <Toolbar className={styles.navbar}>
            <IconButton className={styles.homeIcon}>
              <GestureIcon />
            </IconButton>

            <Typography variant="h6" className={styles.logo}>
              Bulletin Board
            </Typography>

            <div className={styles.right_buttons}>
              <Button className={styles.btn_yourPosts} color="inherit">Your Posts</Button>
              <Button className={styles.btn_login} color="inherit">Log In</Button>
            </div>
          </Toolbar>
        </AppBar>
      </Container>

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
  children: PropTypes.node,
  className: PropTypes.string,
};


/*const mapStateToProps = state => ({
  someProp: reduxSelector(state),
});

const mapDispatchToProps = dispatch => ({
  someAction: arg => dispatch(reduxActionCreator(arg)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);
*/

export {
  Component as Header,
  //Container as Header,
  Component as HeaderComponent,  // w testach będziemy używać HeaderComponent
};
