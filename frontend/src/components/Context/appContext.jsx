import { SIGNIN_USER_BEGIN,SIGNIN_USER_SUCCESS,SIGNIN_USER_ERROR,SIGNUP_USER_BEGIN,SIGNUP_USER_SUCCESS,SIGNUP_USER_ERROR } from "./actions";
import React, { useState, useContext, useReducer } from "react";
import reducer from "./reducers";
import axios from "axios";


const token = localStorage.getItem('token')
const user = localStorage.getItem('user')


const initialState = {
  user: user ? JSON.parse(user):null,
  token: token
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // Correct placement inside a functional component

  const addUserToLocal = ({user,token}) => {
    localStorage.setItem('user',JSON.stringify(user))
    localStorage.setItem('token',token)
  }

  const removeUser = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  const registerUser = async (currentUser) => {
    dispatch({type:SIGNUP_USER_BEGIN})

    try {
        const response = await axios.post('/api/v1/auth/register',currentUser)
        console.log(response)

        const {user,token} = response.data

        dispatch({
            type:SIGNUP_USER_SUCCESS,
            payload:{
                user,token
            }
        })

        addUserToLocal({user,token})
    } catch (error) {
        console.log(error.response)
        dispatch({
            type: SIGNUP_USER_ERROR,
            payload:{msg:error.response.data.msg}
        })
    }
  }
  const loginUser = async (currentUser) => {
    dispatch({ type: SIGNIN_USER_BEGIN });
  
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token } = data;
  
      dispatch({
        type: SIGNIN_USER_SUCCESS,
        payload: { user, token },
      });
  
      addUserToLocal({ user, token });
    } catch (error) {
      dispatch({
        type: SIGNIN_USER_ERROR,
        payload: { msg: error.response?.data?.msg || "Login failed" },
      });
      throw new Error(error.response?.data?.msg || "Login failed"); // Propagate error
    }
  };

  const logoutUser = () => {
    removeUser();
    dispatch({ type: "LOGOUT_USER" });
  };
  
  return (
    <AppContext.Provider value={{ ...state, registerUser, loginUser,logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };
