import * as types from '../constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData, history) => async (dispatch) =>{
    try{
        const { data } = await api.signIn(formData);
        dispatch({ type: types.AUTH, data });
        history.push('/');

    }catch (e){
        console.log(e)
    }
}

export const signup = (formData, history) => async (dispatch) =>{
    try{
        const { data } = await api.signUp(formData);
        dispatch({ type: types.AUTH, data });

        history.push('/');

    }catch (e){
        console.log(e);
    }
}