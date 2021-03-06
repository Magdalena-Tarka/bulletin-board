import Axios from 'axios';
import { API_URL } from '../config';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getOne = ({posts}) => posts.onePost;
export const getActive = ({posts}) => posts.data.filter(post => post.status === 'active');

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const FETCH_ONE_POST = createActionName('FETCH_ONE_POST');
const ADD_POST = createActionName('ADD_POST');
const EDIT_POST = createActionName('EDIT_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const fetchOnePost = payload => ({ payload, type: FETCH_ONE_POST });
export const addPost = (payload) => ({ payload, type: ADD_POST });
export const editPost = (payload) => ({ payload, type: EDIT_POST });

/* thunk creators */
export const fetchAll = () => {
  return (dispatch, getState) => {

    if(!getState().posts.data.length && getState().posts.loading.active === false) {
      dispatch(fetchStarted());

      Axios
        .get(`${API_URL}/posts`)
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};

export const fetchOnePostInAPI = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get(`${API_URL}/post/${id}`)
      .then(res => {
        dispatch(fetchOnePost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const addPostInAPI = newPost => {
  return (dispatch, getState) => {
    Axios
      .post(`${API_URL}/post/add`, newPost)
      .then(res => {
        dispatch(addPost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const editPostInAPI = (id, editedPost) => {
  return (dispatch, getState) => {
    console.log('editedPost:', editedPost);
    Axios
      .put(`${API_URL}/post/${id}/edit`, editedPost)
      .then(res => {
        dispatch(editPost(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const deletePostInAPI = (id) => {
  return (dispatch, getState) => {

    Axios
      .delete(`${API_URL}/post/${id}/delete`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case FETCH_ONE_POST: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        onePost: action.payload,
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    }
    case EDIT_POST: {
      return {
        ...statePart,
        data: statePart.data.map(post => (
          post.id === action.payload.id ? action.payload : post
        )),
      };
    }
    default:
      return statePart;
  }
};
