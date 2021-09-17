import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { setUserStatus } from '../../../redux/userRedux';

import styles from './Hero.module.scss';
import { Button } from '../../common/Button/Button';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Component = ({ className, setUserStatus }) => (
  <div className={clsx(className, styles.root)}>
    <Grid
      item xs={12} sm={6}
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={styles.hero}
    >
      <Typography variant="h4" className={styles.hero_title1}>
        Welcome...
      </Typography>
      <Typography variant="h5" className={styles.hero_title2}>
        nice to meet you!
      </Typography>

      <Typography variant="body2" className={styles.hero_body}>
        Lorem ipsum dolor sit amet, conse adipisicing. Quos blanditiis tenetur
        unde suscipit, neque consectetur elit doloribus, cupiditate numquam
        dignissimos laborum fugiat deleniti?
      </Typography>

      <Button className={styles.btn_login}
        variant="filled"
        color="inherit"
        onClick={() => setUserStatus('is loggedIn')}
      >
        Log In
      </Button>
    </Grid>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  setUserStatus: PropTypes.func,
};


const mapStateToProps = state => ({
  setUserStatus: setUserStatus(state),
});

const mapDispatchToProps = dispatch => ({
  setUserStatus: userStatus => dispatch(setUserStatus(userStatus)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Hero,
  Container as Hero,
  Component as HeroComponent,
};
