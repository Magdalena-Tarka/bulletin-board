import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchAll } from '../../../redux/postsRedux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';

import styles from './UserPosts.module.scss';
import { Button } from '../../common/Button/Button';
import { PostSummary } from '../../features/PostSummary/PostSummary';
import { NotFound } from '../NotFound/NotFound';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const sortByDate = arr => {
  arr.sort((a,b) => Number(new Date(a.publicationDate)) - Number(new Date(b.publicationDate)));
  return arr;
};

const Component = ({ posts, userStatus, userEmail, fetchAllPosts, ...props }) => {

  useEffect(() => {
    fetchAllPosts();
  }, [fetchAllPosts]);

  const postsByEmail = posts.filter(post => post.email === userEmail);

  return (
    <div className={styles.root}>

      {userStatus === 'is loggedOut' ? <NotFound /> : (
        <Grid className={styles.posts_wrapper}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid container justifyContent="center">
            <Typography className={styles.posts_title} variant="h6">
              {userStatus ==='is admin' ? 'All Posts' : 'My Posts'}
            </Typography>
          </Grid>

          <Grid className={styles.posts_buttons_top}
            container
            alignItems="center"
          >
            <div className={styles.posts_buttons_top_right}>
              {userStatus === 'is loggedOut' ? '' :
                <Button
                  className={styles.btn_createPost}
                  variant="filled"
                  color="inherit"
                  component={Link}
                  to={'/post/add'}
                >Create Post</Button>
              }
            </div>
          </Grid>

          <Grid className={styles.posts}
            container
            alignItems="center"
            direction="row"
          >
            {userStatus === 'is admin' ? (
              posts.length && sortByDate(posts).map(post => (
                <Grid key={post.id} item xs={12} sm={4} md={3}>
                  <PostSummary {...post}/>
                </Grid>
              ))
            ) : (
              postsByEmail.length && userStatus !== 'is loggedOut' ? sortByDate(postsByEmail).map(post => (
                <Grid key={post.id} item xs={12} sm={4} md={3}>
                  <PostSummary {...post}/>
                </Grid>
              )) : (
                <Typography className={styles.posts_info} variant="subtitle1">
                  Uh, You have not posted anything yet..
                </Typography>
              )
            )}
          </Grid>

          <div className={styles.posts_buttons_bottom}>
            {userStatus === 'is loggedOut' ? null :
              <Button
                className={styles.btn_createPost}
                variant="filled"
                color="inherit"
                component={Link}
                to={'/post/add'}
              >Create Post</Button>
            }
          </div>

        </Grid>
      )}

    </div>
  );
};

Component.propTypes = {
  posts: PropTypes.array,
  userStatus: PropTypes.string,
  userEmail: PropTypes.string,
  fetchAllPosts: PropTypes.func,
};


const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getUserStatus(state),
  userEmail: getUserEmail(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllPosts: () => dispatch(fetchAll()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as UserPosts,
  Container as UserPosts,
  Component as UserPostsComponent,
};
