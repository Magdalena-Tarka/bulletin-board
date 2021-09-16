/* selectors */
export const getUserStatus = ({user}) => user.userStatus;
export const getUserEmail = ({user}) => user.userEmail;
export const getUserNickname = ({user}) => user.userNickname;

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
