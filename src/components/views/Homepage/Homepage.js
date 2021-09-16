import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, getActive } from '../../../redux/postsRedux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';

import styles from './Homepage.module.scss';
import { Hero } from '../../features/Hero/Hero';
import { PostSummary } from '../../features/PostSummary/PostSummary';
import { NotFound } from '../NotFound/NotFound';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const sortByDate = arr => {
  arr.sort((a,b) => Number(new Date(a.publicationDate)) - Number(new Date(b.publicationDate)));
  return arr;
};

const Component = ({ posts, activePosts, userStatus, userEmail, ...props }) => {

  const userNickname = props.match.params.nickname;
  const postsByEmail = posts.filter(post => post.email === userEmail);

  return (
    <div className={styles.root}>
      {userStatus === 'is loggedOut' && !userNickname ? <Hero /> : ''}
      <Grid
        className={styles.posts_wrapper}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid container justifyContent="center">
          <Typography variant="h6">
            Posts List
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
                color="inherit"
                component={Link}
                to={'/post/add'}
              >Create Post</Button>
            }
          </div>
        </Grid>

        <Grid
          className={styles.posts}
          container
          alignItems="center"
          direction="row"
        >

          {!userNickname ? (
            userStatus === 'is admin' ? (
              posts.length && sortByDate(posts).map(post => (
                <Grid key={post.id} item xs={12} sm={4} md={3}>
                  <PostSummary {...post}/>
                </Grid>
              ))
            ) : (
              activePosts.length && sortByDate(activePosts).map(post => (
                <Grid key={post.id} item xs={12} sm={4} md={3}>
                  <PostSummary {...post}/>
                </Grid>
              ))
            )
          ) : (
            postsByEmail.length && userStatus === 'is loggedIn' ? sortByDate(postsByEmail).map(post => (
              <Grid key={post.id} item xs={12} sm={4} md={3}>
                <PostSummary {...post}/>
              </Grid>
            )) : (<NotFound />)
          )}

        </Grid>

        <div className={styles.posts_buttons_bottom}>
          {userStatus === 'is loggedOut' ? null :
            <Button
              className={styles.btn_createPost}
              color="inherit"
              component={Link}
              to={'/post/add'}
            >Create Post</Button>
          }
        </div>
      </Grid>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  posts: PropTypes.array,
  activePosts: PropTypes.array,
  userStatus: PropTypes.string,
  userEmail: PropTypes.string,
  match: PropTypes.object,
};

const mapStateToProps = (state, {...props}) => ({
  posts: getAll(state),
  activePosts: getActive(state),
  userStatus: getUserStatus(state),
  userEmail: getUserEmail(state),
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
