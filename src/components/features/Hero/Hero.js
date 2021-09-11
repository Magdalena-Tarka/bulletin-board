import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

//import { connect } from 'react-redux';
//import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux';

import styles from './Hero.module.scss';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Component = ({ className, children }) => (
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
      <Button className={styles.btn_login_hero} color="inherit">Log In</Button>
    </Grid>
  </div>
);

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
  Component as Hero,
  //Container as Hero,
  Component as HeroComponent,
};
