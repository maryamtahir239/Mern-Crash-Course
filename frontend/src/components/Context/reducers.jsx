import { token } from "morgan";
import { SIGNIN_USER_BEGIN,SIGNIN_USER_SUCCESS,SIGNIN_USER_ERROR,SIGNUP_USER_BEGIN,SIGNUP_USER_SUCCESS,SIGNUP_USER_ERROR,LOGOUT_USER } from "./actions";
const reducer = (state,action) => {

    if (action.type === SIGNUP_USER_BEGIN) {
        return { ...state }; // No change, just spread the state for now
      }
    
      if (action.type === SIGNUP_USER_SUCCESS) {
        return {
          ...state,
          user: action.payload.user,
          token: action.payload.token,
        };
      }
    
      if (action.type === SIGNUP_USER_ERROR) {
        return {
          ...state,
          
        };
      }

      if (action.type === SIGNIN_USER_BEGIN) {
        return {
          ...state,
          
        };
      }
      if (action.type === SIGNIN_USER_SUCCESS) {
        return {
          ...state,
          user:action.payload.user,
          token:action.payload.token
          
        };
      }

      if (action.type === SIGNIN_USER_ERROR) {
        return {
          ...state,
         
        
        };
      }
    
    
      if (action.type === LOGOUT_USER) {
        // Clear user and token when logging out
        return {
          ...state,
          user: null,
          token: null,
        };
      }
    
      throw new Error(`No such action ${action.type}`);
    };
    
    export default reducer;