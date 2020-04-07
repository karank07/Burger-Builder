import * as actionType from '../actions/actionType';

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

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADD_ING:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] + 1
                },
                totalPrice: state.totalPrice + ING_PRICES[action.ingName]
            };
        case actionType.REM_ING:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingName]: state.ingredients[action.ingName] - 1
                },
                totalPrice: state.totalPrice - ING_PRICES[action.ingName]
            };
        case actionType.SET_ING:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            };
        case actionType.FETCH_ING_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default reducer;