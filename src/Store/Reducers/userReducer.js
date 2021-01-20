import { initialStateAuth } from "../initialState";
import { LOGOUT_USER, LOGIN_USER } from "../Actions/userActions";

function userReducer(state = initialStateAuth, action) {
    switch (action.type) {
      case LOGIN_USER:
        return Object.assign({}, state, {
          loggedIn: true,
          user: action.payload
        })
      case LOGOUT_USER:
        localStorage.clear();
        window.location.assign('http://localhost:3000/');
        return Object.assign({}, state, {
          loggedIn: false,
          user: {}
        })
      default:
        return state
    }
  }

  export default userReducer;
