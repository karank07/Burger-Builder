import * as actionType from './actionType';
import axios from '../../axios-order';

export const addIng = (name) => {
    return {
        type: actionType.ADD_ING,
        ingName: name
    };
};

export const remIng = (name) => {
    return {
        type: actionType.REM_ING,
        ingName: name
    };
};

export const setIng = (ingredients) => {
    return {
        type: actionType.SET_ING,
        ingredients: ingredients
    };
};

export const fetchIngFailed = () => {
    return {
        type: actionType.FETCH_ING_FAILED,

    };
};

export const initIng = () => {
    return dispatch => {
        axios.get('https://burgerbuilder-b7bf1.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIng(response.data));
            })
            .catch(error => {
                dispatch(fetchIngFailed())
            });
    };
};

