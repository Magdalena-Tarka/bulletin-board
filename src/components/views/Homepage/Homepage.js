import React from 'react';
import PropTypes from 'prop-types';

//import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll/*, reduxActionCreator*/ } from '../../../redux/postsRedux';
import { getUserStatus/*, reduxActionCreator*/ } from '../../../redux/userRedux';

import styles from './Homepage.module.scss';
import { Hero } from '../../features/Hero/Hero';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const Component = ({ posts, userStatus }) => {

  return (
    <div className={styles.root}>
      {userStatus === 'is loggedOut' ? <Hero /> : ''}
      <Grid
        className={styles.posts_wrapper}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid className={styles.posts_buttons_top}
          container
          alignItems="center"
        >
          <div className={styles.posts_buttons_top_left}>
            <Button className={styles.btn_allPosts} color="inherit">All Posts</Button>
            {userStatus === 'is loggedOut' ? '' :
              <Button className={styles.btn_yourPosts} color="inherit">Your Posts</Button>
            }
          </div>
          <div className={styles.posts_buttons_top_right}>
            {userStatus === 'is loggedOut' ? '' :
              <Button className={styles.btn_addPost} color="inherit">Add Post</Button>
            }
          </div>
        </Grid>

        <Grid
          className={styles.posts}
          container
          alignItems="center"
          direction="row"
        >
          {posts.map(post => (
            <Grid key={post.id} item xs={12} sm={4} md={3}>
              <Card className={styles.post}>
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
            </Grid>
          ))}
        </Grid>

        <div className={styles.posts_buttons_bottom}>
          {userStatus === 'is loggedOut' ? '' :
            <Button className={styles.btn_addPost} color="inherit">Add Post</Button>
          }
        </div>

      </Grid>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  posts: PropTypes.array,
  userStatus: PropTypes.string,
};


const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getUserStatus(state),
});

/*const mapDispatchToProps = dispatch => ({
  someAction: arg => dispatch(reduxActionCreator(arg)),
});*/

const Container = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
