import * as ActionType from './ActionType'
import axios from 'axios'


export const authSuccess=(token, userId)=>{
    return{
        type: ActionType.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}

export const authFailed =(errMsg)=>{
        return{
            type: ActionType.AUTH_FAILED,
            payload: errMsg,
        }
}


export const auth=(email, password, mode)=>{
    return dispatch=>{
        const authData={
            email: email,
            password: password,
            returnSecureToken: true
        }
        let authUrl = null;
        if(mode === 'Sign Up'){
            authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
        }else{
            authUrl= 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
        }
        const Api_key ="jiofjicjijicj";
        axios.post(authUrl+Api_key, authData)
        .then(res=>{
            let expTime = new Date(new Date().getTime() + res.data.expiresIn * 1000)
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('userId', res.data.localId);
            localStorage.setItem('expTime', expTime)
            if(res.status===200){
                dispatch(authSuccess(res.data.idToken, res.data.localId))
            }
        })
        .catch(err=>{
            dispatch(authLoading(false)){
                dispatch(authFailed(err.response.data.error.message))
            }
        })
    }
}

export const logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expTime');
    localStorage.removeItem('userId');
    return{
        type: ActionType.AUTH_LOGOUT
    }
}

export const authCheck =()=> dispatch=>{
    const token = localStorage.getItem('token')
    if(!token){
        //logOut
        dispatch(logOut())
    }else{
        const expTime = new Date(localStorage.getItem('expTime'))
        if(expTime<= new Date()){
            // logOut
            dispatch(logOut())
        }else{
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId))
        }
    }
}