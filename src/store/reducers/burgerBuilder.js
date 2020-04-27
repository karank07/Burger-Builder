import * as actionType from '../actions/actionType';
import { updateState } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const ING_PRICES = {
    salad: 0.5,
    cheese: 0.3,
    meat: 1,
    bacon: 1.2
}
const addIng = (state, action) => {
    const updateIng = { [action.ingName]: state.ingredients[action.ingName] + 1 }
    const updatedIng = updateState(state.ingredients, updateIng)
    const updatedState = {
        ingredients: updatedIng,
        totalPrice: state.totalPrice + ING_PRICES[action.ingName]
    }
    return updateState(state, updatedState);
};

const remIng = (state, action) => {
    const updateIngs = { [action.ingName]: state.ingredients[action.ingName] - 1 }
    const updatedIngs = updateState(state.ingredients, updateIngs)
    const updatedStates = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + ING_PRICES[action.ingName]
    }
    return updateState(state, updatedStates);
};

const setIng = (state, action) => {
    return updateState(state, {
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false

    });
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_ING: return addIng(state, action);
        case actionType.REM_ING: return remIng(state, action);
        case actionType.SET_ING: return setIng(state, action);
        case actionType.FETCH_ING_FAILED: return updateState(state, { error: true });
        default:
            return state;
    }
};

export default reducer;