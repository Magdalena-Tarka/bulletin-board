import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

//import { connect } from 'react-redux';
//import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux';

import styles from './Footer.module.scss';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PinterestIcon from '@material-ui/icons/Pinterest';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <IconButton><FacebookIcon /></IconButton>
      <IconButton><PinterestIcon /></IconButton>
      <IconButton><InstagramIcon /></IconButton>
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
  Component as Footer,
  //Container as Footer,
  Component as FooterComponent,
};
