import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOne, fetchById, deletePostInAPI } from '../../../redux/postsRedux';
import { getUserStatus, getUserEmail } from '../../../redux/userRedux';

import styles from './Post.module.scss';
import { Button } from '../../common/Button/Button';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Component = ({ className, userStatus, userEmail, post, fetchPostById, deletePostById, ...props }) => {

  useEffect(() => {
    fetchPostById(props.match.params.id);
  }, [props.match.params.id, fetchPostById]);

  let history = useHistory();

  const deletePost = (event) => {
    event.preventDefault();
    deletePostById(props.match.params.id);
    history.push('/');
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Grid className={styles.post_wrapper}
        container item md={12}
        justifyContent="center"
        alignItems="center"
      >
        <Card className={styles.post_card}>
          <Typography className={styles.card_title} variant="h6">Post details</Typography>

          <CardContent className={styles.card_content}>
            <Grid className={styles.card_header} item xs={12}>
              <Grid className={styles.post_image} item xs={12} sm={6}>
                <CardMedia className={styles.image}
                  component="img"
                  image={post.image}
                  title="img"
                />
              </Grid>

              <Grid className={styles.post_details} item xs={12} sm={6}
              >
                <Typography className={clsx(styles.post, styles.title)}
                  variant="subtitle1"
                >{post.title}</Typography>

                <Typography className={clsx(styles.post, styles.price)}
                  variant="subtitle2"
                >
                  <span>Price: </span>{post.price}.00$
                </Typography>

                <Typography className={clsx(styles.post, styles.email)}
                  variant="subtitle2"
                >
                  <MailOutlineIcon /> {post.email}
                </Typography>

                {!post.phone ? null : (
                  <Typography className={clsx(styles.post, styles.phone)}
                    variant="subtitle2"
                  >
                    <PhoneIcon /> {post.phone}
                  </Typography>
                )}

                {!post.phone ? null : (
                  <Typography className={clsx(styles.post, styles.location)}
                    variant="subtitle2"
                  >
                    <LocationOnIcon /> {post.location}
                  </Typography>
                )}

                <Typography className={clsx(styles.post, styles.publicationDate)}
                  variant="subtitle2"
                >
                  <span>Published: </span>{post.publicationDate}
                </Typography>

                <Typography className={clsx(styles.post, styles.status)}
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
              <Typography className={clsx(styles.post, styles.title)}
                variant="subtitle1"
              >{post.title}</Typography>

              <Typography className={clsx(styles.post, styles.content)}
                variant="body2"
              >{post.content}</Typography>

              <Typography className={clsx(styles.post, styles.updateDate)}
                variant="subtitle2"
              >Last Modified: {post.updateDate}</Typography>
            </Grid>
          </CardContent>

          {userStatus === 'is admin' ? (
            <Button
              className={styles.btn_deletePost}
              variant="filled"
              onClick={deletePost}
            >Delete Post</Button>
          ) : null }
          {(userStatus === 'is loggedIn' && userEmail === post.email) || userStatus === 'is admin' ? (
            <Button
              className={styles.btn_editPost}
              variant="filled"
              component={Link}
              to={`/post/${post._id}/edit`}
            >Edit Post</Button>
          ) : null }
        </Card>
      </Grid>
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  userStatus: PropTypes.string,
  userEmail: PropTypes.string,
  match: PropTypes.object,
  fetchPostById: PropTypes.func,
  deletePostById: PropTypes.func,
};


const mapStateToProps = (state) => ({
  post: getOne(state),
  userStatus: getUserStatus(state),
  userEmail: getUserEmail(state),
});

const mapDispatchToProps = dispatch => ({
  fetchPostById: id => dispatch(fetchById(id)),
  deletePostById: id => dispatch(deletePostInAPI(id)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
