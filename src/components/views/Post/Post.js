import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';

import styles from './Post.module.scss';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Component = ({ className, userStatus, userEmail, posts, ...props }) => {

  const postAuthorEmail = posts.filter(post => post.id === props.match.params.id && post.email)[0].email;

  return (
    <div className={clsx(className, styles.root)}>

      {posts.map(post => post.id !== props.match.params.id ? null :
        <Grid key={post.id}
          className={styles.post_wrapper}
          container item md={12}
          justifyContent="center"
          alignItems="center"
        >
          <Card className={styles.post_card}>
            <Typography className={styles.card_title} variant="h6">Post details</Typography>

            <CardContent className={styles.card_content}>
              <Grid className={styles.card_header} item xs={12}>
                <Grid className={styles.post_image} item xs={12} sm={6}>
                  <CardMedia
                    className={styles.image}
                    component="img"
                    image={post.image}
                    title="img"
                  />
                </Grid>

                <Grid className={styles.post_details} item xs={12} sm={6}
                >
                  <Typography
                    className={clsx(styles.post, styles.title)}
                    variant="subtitle1"
                  >{post.title}</Typography>

                  <Typography
                    className={clsx(styles.post, styles.price)}
                    variant="subtitle2"
                  >
                    <span>Price: </span>{post.price}.00$
                  </Typography>

                  <Typography
                    className={clsx(styles.post, styles.email)}
                    variant="subtitle2"
                  >
                    <MailOutlineIcon /> {post.email}
                  </Typography>

                  <Typography
                    className={clsx(styles.post, styles.phone)}
                    variant="subtitle2"
                  >
                    <PhoneIcon /> {post.phone}
                  </Typography>

                  <Typography
                    className={clsx(styles.post, styles.location)}
                    variant="subtitle2"
                  >
                    <LocationOnIcon /> {post.location}
                  </Typography>

                  <Typography
                    className={clsx(styles.post, styles.publicationDate)}
                    variant="subtitle2"
                  >
                    <span>Published: </span>{post.publicationDate}
                  </Typography>

                  <Typography
                    className={clsx(styles.post, styles.status)}
                    variant="subtitle2"
                  >
                    <span>Status: </span>{post.status}
                  </Typography>

                </Grid>
              </Grid>

              <Grid className={styles.card_description}
                item xs={12}
                diretcion="row"
              >
                <Typography
                  className={clsx(styles.post, styles.title)}
                  variant="subtitle1"
                >{post.title}</Typography>

                <Typography
                  className={clsx(styles.post, styles.content)}
                  variant="body2"
                >{post.content}</Typography>

                <Typography
                  className={clsx(styles.post, styles.updateDate)}
                  variant="subtitle2"
                >Last Modified: {post.updateDate}</Typography>
              </Grid>
            </CardContent>

            {(userStatus === 'is loggedIn' && userEmail === postAuthorEmail) || userStatus === 'is admin' ? (
              <Button
                key={post.id}
                className={styles.btn_editPost}
                component={Link}
                to={`/post/${post.id}/edit`}
              >Edit Post</Button>
            ) : null }
          </Card>
        </Grid>
      )}

    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  posts: PropTypes.array,
  userStatus: PropTypes.string,
  userEmail: PropTypes.string,
  match: PropTypes.object,
};


const mapStateToProps = state => ({
  posts: getAll(state),
  userStatus: getUserStatus(state),
  userEmail: getUserEmail(state),
});

/*const mapDispatchToProps = dispatch => ({
  someAction: arg => dispatch(reduxActionCreator(arg)),
});*/

const Container = connect(mapStateToProps/*, mapDispatchToProps*/)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
