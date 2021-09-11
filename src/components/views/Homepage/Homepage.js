import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll/*, reduxActionCreator*/ } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';
import { Hero } from '../../features/Hero/Hero';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const Component = ({ className, posts }) => {
  console.log('posts:', posts);
  return (
    <Container className={clsx(className, styles.root)} maxWidth="md">
      <div className={styles.wrapper}>
        <Hero />
        <Grid
          className={styles.posts_wrapper}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Grid className={styles.posts_buttons_top}
            container
            justifyContent="start"
            alignItems="center"
          >
            <div className={styles.posts_buttons_top_left}>
              <Button className={styles.btn_allPosts} color="inherit">All Posts</Button>
              <Button className={styles.btn_yourPosts} color="inherit">Your Posts</Button>
            </div>
            <div className={styles.posts_buttons_top_right}>
              <Button className={styles.btn_addPost} color="inherit">Add Post</Button>
            </div>
          </Grid>

          <Grid
            className={styles.posts}
            container
            justifyContent="start"
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
                    <Typography className={styles.post_title} component="subtitle">{post.title}</Typography>
                    <Typography className={styles.post_price} component="p" variant="subtitle">Price: {post.price}$</Typography>
                    <Typography className={styles.post_date} component="p" variant="subtitle">Published: {post.publicationDate}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <div className={styles.posts_buttons_bottom}>
            <Button className={styles.btn_addPost} color="inherit">Add Post</Button>
          </div>

        </Grid>
      </div>
    </Container>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
};


const mapStateToProps = state => ({
  posts: getAll(state),
});

/*const mapDispatchToProps = dispatch => ({
  someAction: arg => dispatch(reduxActionCreator(arg)),
});*/

const HomepageContainer = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as Homepage,
  HomepageContainer as Homepage,
  Component as HomepageComponent,
};
