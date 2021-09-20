import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';

import clsx from 'clsx';
//import { v4 as uuidv4 } from 'uuid';

import { connect } from 'react-redux';
import { addPostInAPI } from '../../../redux/postsRedux';
import { getUserStatus/*, reduxActionCreator*/ } from '../../../redux/userRedux';

import styles from './PostAdd.module.scss';
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

const Component = ({ className, userStatus, addPost }) => {
  const [newPost, setNewPost] = useState('');
  let history = useHistory();

  const handleNewPost = (event) => {
    setNewPost({...newPost, [event.target.name]: event.target.value});
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const [day, month, year] = [currentDate.getUTCDate(), currentDate.getUTCMonth()+1, currentDate.getUTCFullYear()];
    let newDate = day + '/' + month + '/' + year;
    return newDate;
  };

  const submitForm = (event) => {
    event.preventDefault();

    if(!newPost.title || !newPost.content || !newPost.price || !newPost.status || !newPost.email) {
      alert('You can\'t leave required fields empty!');
    } else if(newPost.title.length >= 30) {
      alert('Title can\'t be longer than 30 characters');
    } else if(newPost.content.length < 10) {
      alert('Description can\'t be shorter than 10 characters');
    } else if(newPost.price > 99999) {
      alert('Price can\'t be higher than 99999$');
    } else {

      addPost({
        ...newPost,
        publicationDate: getCurrentDate(),
        updateDate: getCurrentDate(),
        //id: uuidv4(),
      });
      setNewPost('');
      history.push('/');
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
            <Typography className={styles.post_title} variant="h6">Create your post</Typography>

            <CardContent>
              <form className={styles.post_form}>
                <TextField
                  className={clsx(styles.input, styles.title)}
                  onChange={handleNewPost}
                  name="title"
                  placeholder="title*"
                  helperText="max. 30 characters"
                  value={newPost.title}
                  required
                  inputProps={{
                    minLength: 5,
                    maxLength: 30,
                  }}
                  fullWidth
                />
                <TextField
                  className={clsx(styles.input, styles.description)}
                  onChange={handleNewPost}
                  name="content"
                  placeholder="description*"
                  helperText="max. 500 characters"
                  value={newPost.description}
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
                  onChange={handleNewPost}
                  name="price"
                  type="number"
                  placeholder="price*"
                  value={newPost.price}
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
                    onChange={handleNewPost}
                    required
                    name="status"
                    value={newPost.status}
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
                  onChange={handleNewPost}
                  name="image"
                  placeholder="url to your image"
                  helperText=".jpg, .jpeg, .png, .gif"
                  value={newPost.image}
                />
                {/*<TextField
                  className={clsx(styles.input, styles.image)}
                  onChange={handleNewPost}
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
                  onChange={handleNewPost}
                  name="email"
                  placeholder="your email*"
                  helperText=" "
                  value={newPost.email}
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
                  onChange={handleNewPost}
                  name="phone"
                  placeholder="phone"
                  helperText=" "
                  value={newPost.phone}
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
                  onChange={handleNewPost}
                  name="location"
                  placeholder="location"
                  value={newPost.location}
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
              Add post
            </Button>
          </Card>
        </Grid>
      ) : <NotFound />}
    </div>
  );
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  userStatus: PropTypes.string,
  addPost: PropTypes.func,
};


const mapStateToProps = state => ({
  userStatus: getUserStatus(state),
});

const mapDispatchToProps = dispatch => ({
  //addPost: (newPost) => dispatch(addPost(newPost)),
  addPost: (newPost) => dispatch(addPostInAPI(newPost)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
