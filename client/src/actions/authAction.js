import * as type from '../actions/type';
import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utilis/setAuthToken";


export const registerUser = (newUser,history)=> dispatch =>{
    axios.post('/api/users/register',newUser)
    .then(res=>history.push('/login')
    ).catch(err=>dispatch(getError(err)))
}


export const loginUser = (loginUser,history)=> dispatch =>{
    axios.post('/api/users/login',loginUser)
    .then(res=>{
        const { token } = res.data;
        localStorage.setItem('userToken', (token));
        setAuthToken(token);
        let decode = jwt_decode(token);
        dispatch(setCurrentUser(decode))
    }
    ).catch(err=>dispatch(getError(err)))
}

export const logoutUser = ()=> dispatch =>{
    localStorage.removeItem('userToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}

export const editImage = (data, history) => dispatch =>{
    axios.post('/api/profile/image', data)
        .then(res=> history.push('/dashboard'))
        .catch(err=>dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        }))
}





///constants
/////////////////////////////////////////////
//getting current user
export const setCurrentUser = (decode)=>{
    return{
        type:type.SET_CURRENT_USER,
        payload:decode
    }
}


//get errors
export const getError = (err)=>{
    return{
        type:type.GET_ERRORS,
        payload:err.response.data
    }
}
