import React from 'react';
import PropTypes from 'prop-types';

//import { connect } from 'react-redux';
//import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux';

import styles from './Button.module.scss';

import Button from '@material-ui/core/Button';

const Component = ({
  children,
  variant,
  className: propClassName,
  ...props
}) => {

  const classes = [];
  if (propClassName) classes.push(propClassName);
  if (variant) classes.push(styles[variant]);

  return (
    <Button {...props} className={classes.join(' ')}>
      {children}
    </Button>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.string,
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
  Component as Button,
  //Container as Button,
  Component as ButtonComponent,
};
