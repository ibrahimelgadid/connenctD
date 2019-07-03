import * as type from './type';
import axios from "axios";
import setAuthToken from "../utilis/setAuthToken";


export const getCurrentProfile = () => dispatch=>{
    dispatch(setProfileLoading());
    axios.get('/api/profile').then(
        res=>dispatch({
            type:type.GET_PROFILE,
            payload:res.data
        })
    ).catch(err=>dispatch({
        type:type.GET_PROFILE,
        payload:{}
    }))
}


export const getProfiles = () => dispatch=>{
    dispatch(setProfileLoading());
    axios.get('/api/profile/all').then(
        res=>dispatch({
            type:type.GET_PROFILES,
            payload:res.data
        })
    ).catch(err=>dispatch({
        type:type.GET_PROFILES,
        payload:null
    }))
}

export const getProfileByHandle = (handle) => dispatch=>{
    dispatch(setProfileLoading());
    axios.get('/api/profile/handle/'+handle).then(
        res=>dispatch({
            type:type.GET_PROFILE_BY_HANDLE,
            payload:res.data
        })
    ).catch(err=>dispatch({
        type:type.GET_PROFILE_BY_HANDLE,
        payload:null
    }))
}


export const addExperience = (data,history) => dispatch =>{
    axios.post('/api/profile/experience',data)
        .then(res=>history.push('/dashboard'))
        .catch(err=>dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        }))
}

export const deleteExperience = (id) => dispatch =>{
    axios.delete('/api/profile/experience/'+id)
        .then(res=>dispatch({
            type:type.GET_PROFILE,
            payload:res.data
        }))
        .catch(err=>dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        }))
}


export const deleteEducation = (id) => dispatch =>{
    axios.delete('/api/profile/education/'+id)
        .then(res=>dispatch({
            type:type.GET_PROFILE,
            payload:res.data
        }))
        .catch(err=>dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        }))
}

export const addEducation = (data,history) => dispatch =>{
    axios.post('/api/profile/education',data)
        .then(res=>history.push('/dashboard'))
        .catch(err=>dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        }))
}



export const createProfile = (data, history) => dispatch =>{
    axios.post('/api/profile', data)
        .then(res=>history.push('/dashboard'))
        .catch(err=>dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        }))
}



export const deleteAccount = () => dispatch=>{
   if(window.confirm('Are you sure? this can NOT be reversable!')){
       axios.delete('/api/profile')
       .then(res=>
            dispatch({
                type:type.SET_CURRENT_USER,
                payload:{}
            }))
        .catch(err=>dispatch({
            type:type.GET_ERRORS,
            payload:err.response.data
        }));

        localStorage.removeItem('userToken');
        setAuthToken(false);
   }
}



export const setProfileLoading = () =>{
    return{
        type:type.PROFILE_LOADING
    }
}

export const clearCurrentProfile = () =>{
    return{
        type:type.CLEAR_CURRENT_PROFILE
    }
}