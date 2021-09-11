/* selectors */
export const getUserStatus = ({user}) => user.userStatus;

/* action name creator */
const reducerName = 'user';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const SET_USER_STATUS = createActionName('GET_USER_STATUS');

/* action creators */
export const setUserStatus = payload => ({ payload, type: SET_USER_STATUS });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  console.log('action.payload:', action.payload);
  switch (action.type) {
    case SET_USER_STATUS: {
      return {
        ...statePart,
        userStatus: action.payload,
      };
    }
    default:
      return statePart;
  }
};
