import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

//import { connect } from 'react-redux';
//import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux';

import styles from './MainLayout.module.scss';

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import Container from '@material-ui/core/Container';

const Component = ({ className, children }) => {

  return (
    <div className={clsx(className, styles.root)}>
      <Container maxWidth="md">
        <Header />
        {children}
        <Footer />
      </Container>
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
  Component as MainLayout,
  //Container as MainLayout,
  Component as MainLayoutComponent,  // w testach będziemy używać MainLayoutComponent
};
