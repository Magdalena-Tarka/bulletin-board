import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//import clsx from 'clsx';

import { connect } from 'react-redux';
import { getActive, getAll/*, reduxActionCreator*/ } from '../../../redux/postsRedux';
import { getUserStatus/*, reduxActionCreator*/ } from '../../../redux/userRedux';

import styles from './Homepage.module.scss';
import { Hero } from '../../features/Hero/Hero';
import { PostSummary } from '../../features/PostSummary/PostSummary';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const sortByDate = arr => {
  arr.sort((a,b) => Number(new Date(a.publicationDate)) - Number(new Date(b.publicationDate)));
  return arr;
};

const Component = ({ posts, userStatus, activePosts }) => {
  //const newDate = new Date();
  //console.log('newDate:', newDate);

  return (
    <div className={styles.root}>
      {userStatus === 'is loggedOut' ? <Hero /> : ''}
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
          {/*<div className={styles.posts_buttons_top_left}>
            <Button className={styles.btn_allPosts} color="inherit">All Posts</Button>
            {userStatus === 'is loggedOut' ? '' :
              <Button className={styles.btn_yourPosts} color="inherit">Your Posts</Button>
            }
          </div>*/}
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
          {userStatus === 'is admin' ? <>
            {posts.length && sortByDate(posts).map(post => (
              <Grid key={post.id} item xs={12} sm={4} md={3}>
                <PostSummary {...post}/>
              </Grid>
            ))}
          </> : <>
            {activePosts.length && sortByDate(activePosts).map(post => (
              <Grid key={post.id} item xs={12} sm={4} md={3}>
                <PostSummary {...post}/>
              </Grid>
            ))}
          </>}

        </Grid>

        <div className={styles.posts_buttons_bottom}>
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
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  posts: PropTypes.array,
  activePosts: PropTypes.array,
  userStatus: PropTypes.string,
};


const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getUserStatus(state),
  activePosts: getActive(state),
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
