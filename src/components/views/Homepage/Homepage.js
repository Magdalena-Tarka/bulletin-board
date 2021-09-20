import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

//import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchActive } from '../../../redux/postsRedux';
import { getUserStatus } from '../../../redux/userRedux';

import styles from './Homepage.module.scss';
import { Hero } from '../../features/Hero/Hero';
import { Button } from '../../common/Button/Button';
import { PostSummary } from '../../features/PostSummary/PostSummary';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const sortByDate = arr => {
  arr.sort((a,b) => Number(new Date(a.publicationDate)) - Number(new Date(b.publicationDate)));
  return arr;
};

const Component = ({ activePosts, userStatus, fetchActivePosts }) => {

  useEffect(() => {
    fetchActivePosts();
  }, [fetchActivePosts]);

  return (
    <div className={styles.root}>
      {userStatus === 'is loggedOut' ? <Hero /> : null}

      <Grid className={styles.posts_wrapper}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid container justifyContent="center">
          <Typography className={styles.posts_title} variant="h6">
            Posts List
          </Typography>
        </Grid>

        <Grid className={styles.posts_buttons_top}
          container
          alignItems="center"
        >
          <div className={styles.posts_buttons_top_right}>
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

        <Grid className={styles.posts}
          container
          alignItems="center"
          direction="row"
        >
          {activePosts.length && sortByDate(activePosts).map(post => (
            <Grid key={post._id} item xs={12} sm={4} md={3}>
              <PostSummary {...post}/>
            </Grid>
          ))}
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

    </div>
  );
};

Component.propTypes = {
  activePosts: PropTypes.array,
  userStatus: PropTypes.string,
  fetchActivePosts: PropTypes.func,
};

const mapStateToProps = (state) => ({
  activePosts: getAll(state),
  userStatus: getUserStatus(state),
});

const mapDispatchToProps = dispatch => ({
  fetchActivePosts: () => dispatch(fetchActive()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
