import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//import clsx from 'clsx';

//import { connect } from 'react-redux';
//import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux';

import styles from './PostSummary.module.scss';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const Component = ({ className, children, ...post }) => (

  <div className={styles.post}>
    <Card
      className={styles.post_card}
      component={Link}
      to={`/post/${post._id}`}
    >
      <CardContent>
        <CardMedia
          className={styles.post_image}
          component="img"
          image={post.image}
          title="img"
        />
        <Typography className={styles.post_title} variant="subtitle1">{post.title}</Typography>
        <Typography className={styles.post_price} variant="subtitle2">Price: {post.price}$</Typography>
        <Typography className={styles.post_date} variant="subtitle2">Published: {post.publicationDate}</Typography>
      </CardContent>
    </Card>
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
  Component as PostSummary,
  //Container as PostSummary,
  Component as PostSummaryComponent,
};
