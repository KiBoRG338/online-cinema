import { toast } from "react-toastify";

export const LOGIN_USER = "LOGIN_USER";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
  
export const userPostFetch = user => {
    return dispatch => {
      return fetch("http://localhost:8000/api/v1/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(response => {
            if (response.message) {
              toast.error(`Something went wrong with the registration...`);
            } else {
              toast.success(`You have succesfully registered.`);
            }
        })
    }
  }

  export const userLoginFetch = user => {
    return dispatch => {
      return fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(response => {
          if (response.message) {
            toast.error(`Login or password is invalid.`);
          } else {
            localStorage.setItem("token", response.data.token);
            dispatch(loginUser(response.data.user));
          } 
        })
    }
  }

  export const getProfileFetch = () => {
    return dispatch => {
      const token = localStorage.token;
      if (token) {
        return fetch("http://localhost:8000/api/v1/users/me", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': token 
          }
        })
            .then(resp => resp.json())
            .then(response => {
            if (response.message) {
                localStorage.removeItem("token");
                toast.error(`You have not authorized.`);
            } else {
                dispatch(loginUser({id: response.data._id, username: response.data.username, type: response.data.type}))
            }
          })
      }
    }
  }
  
  export const loginUser = user => ({
      type: LOGIN_USER,
      payload: user
  })

  export const logoutUser = () => ({
    type: LOGOUT_USER
  })