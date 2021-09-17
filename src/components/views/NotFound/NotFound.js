import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import clsx from 'clsx';

//import { connect } from 'react-redux';
//import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux';

import styles from './NotFound.module.scss';
import { Button } from '../../common/Button/Button';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const Component = ({ className }) => (

  <div className={clsx(className, styles.root)}>
    <Container className={styles.wrapper} maxWidth="sm">
      <Grid className={styles.left}
        item xs={12} sm={6}
        justifyContent="center"
        alignItems="center"
      >
        <div>
          <Typography className={styles.errorStatus}
            variant="h1"
          >404</Typography>
          <Typography className={styles.notFound}
            variant="subtitle1"
          >not found</Typography>
        </div>
      </Grid>

      <Grid className={styles.right}
        item xs={12} sm={6}
        justifyContent="center"
        alignItems="center"
      >
        <Typography className={styles.title1}
          variant="h4"
        >
          Ooops,
        </Typography>

        <Typography className={styles.title2}
          variant="h4"
        >
          <span>nothing</span> here...
        </Typography>

        <Typography className={styles.description}
          variant="body2"
        >
          The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the homepage.
        </Typography>

        <Button className={styles.btn_notFound}
          variant="filled"
          component={Link}
          to={'/'}
        >
          <KeyboardBackspaceIcon className={styles.btn_arrow} />
          homepage</Button>
      </Grid>
    </Container>
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
  Component as NotFound,
  //Container as NotFound,
  Component as NotFoundComponent,
};
