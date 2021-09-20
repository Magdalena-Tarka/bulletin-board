import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getOne, editPostInAPI} from '../../../redux/postsRedux';
import { getUserStatus } from '../../../redux/userRedux';

import styles from '../PostEdit/PostEdit.module.scss';
import { NotFound } from '../NotFound/NotFound';
import { Button } from '../../common/Button/Button';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneIcon from '@material-ui/icons/Phone';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const Component = ({ className, userStatus, editPost, editedPost, ...props }) => {

  const [updatedPost, setUpdatedPost] = useState({
    _id: editedPost._id,
    title: editedPost.title,
    content: editedPost.content,
    price: editedPost.price,
    status: editedPost.status,
    image: editedPost.image,
    email: editedPost.email,
    phone: editedPost.phone,
    location: editedPost.location,
    publicationDate: editedPost.publicationDate,
  });
  let history = useHistory();

  const handleUpdatedPost = (event) => {
    setUpdatedPost({...updatedPost, [event.target.name]: event.target.value});
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const [day, month, year] = [currentDate.getUTCDate(), currentDate.getUTCMonth()+1, currentDate.getUTCFullYear()];
    let newDate = month + '/' + day + '/' + year;
    return newDate;
  };

  const submitForm = (event) => {
    event.preventDefault();

    if(!updatedPost.title || !updatedPost.content || !updatedPost.price || !updatedPost.status || !updatedPost.email) {
      alert('You can\'t leave required fields empty!');
    } else if(updatedPost.title.length >= 30) {
      alert('Title can\'t be longer than 30 characters');
    } else if(updatedPost.content.length < 10) {
      alert('Description can\'t be shorter than 10 characters');
    } else if(updatedPost.price > 99999) {
      alert('Price can\'t be higher than 99999$');
    } else {

      editPost( updatedPost._id, {
        ...updatedPost,
        updateDate: getCurrentDate(),
      });
      setUpdatedPost('');
      history.push(`/post/${updatedPost._id}`);
    }
  };

  return (
    <div className={clsx(className, styles.root)}>

      {userStatus !== 'is loggedOut' ? (
        <Grid
          className={styles.post_wrapper}
          container item xs={12} sm={10} md={9}
          justifyContent="center"
          alignItems="center"
        >
          <Card className={styles.post_card}>
            <Typography className={styles.post_title} variant="h6">Edit your post</Typography>

            <CardContent>
              <form className={styles.post_form}>
                <TextField
                  className={clsx(styles.input, styles.title)}
                  onChange={handleUpdatedPost}
                  name="title"
                  placeholder="title*"
                  helperText="max. 30 characters"
                  value={updatedPost.title}
                  required
                  inputProps={{
                    minLength: 5,
                    maxLength: 30,
                  }}
                  fullWidth
                />
                <TextField
                  className={clsx(styles.input, styles.description)}
                  onChange={handleUpdatedPost}
                  name="content"
                  placeholder="description*"
                  helperText="max. 500 characters"
                  value={updatedPost.content}
                  required
                  multiline={true}
                  rows="5"
                  inputProps={{
                    minLength: 10,
                    maxLength: 500,
                  }}
                  fullWidth
                />
                <TextField
                  className={clsx(styles.input, styles.price)}
                  onChange={handleUpdatedPost}
                  name="price"
                  type="number"
                  placeholder="price*"
                  value={updatedPost.price}
                  helperText=" "
                  required
                  inputProps={{
                    min: 1,
                    max: 99999,
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">$</InputAdornment>,
                  }}
                />
                <FormControl>
                  <Select
                    className={clsx(styles.input, styles.status)}
                    onChange={handleUpdatedPost}
                    required
                    name="status"
                    value={updatedPost.status}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>status</MenuItem>
                    <MenuItem value="draft">draft</MenuItem>
                    <MenuItem value="active">active</MenuItem>
                    <MenuItem value="closed">closed</MenuItem>
                  </Select>
                  <FormHelperText> </FormHelperText>
                </FormControl>
                <TextField
                  className={clsx(styles.input, styles.image)}
                  onChange={handleUpdatedPost}
                  name="image"
                  placeholder="url to your image"
                  helperText=".jpg, .jpeg, .png, .gif"
                  value={updatedPost.image}
                />
                {/*<TextField
                    className={clsx(styles.input, styles.image)}
                    onChange={handleUpdatedPost}
                    name="image"
                    type="file"
                    accept=".jpg, .jpeg, .png, .gif"
                    size="medium"
                    placeholder="image"
                    helperText=".jpg, .jpeg, .png, .gif"
                    value={newPost.image}
                  />*/}
                <TextField
                  className={clsx(styles.input, styles.email)}
                  onChange={handleUpdatedPost}
                  name="email"
                  placeholder="your email*"
                  helperText=" "
                  value={updatedPost.email}
                  required
                  inputProps={{
                    minLength: 9,
                    maxLength: 30,
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      <MailOutlineIcon />
                    </InputAdornment>,
                  }}
                />
                <TextField
                  className={clsx(styles.input, styles.phone)}
                  onChange={handleUpdatedPost}
                  name="phone"
                  placeholder="phone"
                  helperText=" "
                  value={updatedPost.phone}
                  inputProps={{
                    minLength: 9,
                    maxLength: 15,
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>,
                  }}
                />
                <TextField
                  className={clsx(styles.input, styles.location)}
                  onChange={handleUpdatedPost}
                  name="location"
                  placeholder="location"
                  value={updatedPost.location}
                  inputProps={{
                    minLength: 3,
                    maxLength: 30,
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>,
                  }}
                />
              </form>
            </CardContent>

            <Button className={styles.btn_addPost}
              variant="filled"
              type="submit"
              onClick={submitForm}
            >
                Update post
            </Button>
          </Card>
        </Grid>
      ) : <NotFound />}
    </div>
  );
};

Component.propTypes = {
  className: PropTypes.string,
  userStatus: PropTypes.string,
  editPost: PropTypes.func,
  editedPost: PropTypes.array,
  match: PropTypes.object,
};


const mapStateToProps = (state) => ({
  userStatus: getUserStatus(state),
  editedPost: getOne(state),
});

const mapDispatchToProps = dispatch => ({
  //editPost: (updatedPost) => dispatch(editPost(updatedPost)),
  editPost: (id, updatedPost) => dispatch(editPostInAPI(id, updatedPost)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
