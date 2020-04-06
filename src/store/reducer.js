import * as actionType from './action';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0

    },
    totalPrice: 4,
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
                    [action.ingName]: state.ingredients[action.ingName] + 1
                },
                totalPrice: state.totalPrice - ING_PRICES[action.ingName]
            };
        default:
            return state;
    }
};

export default reducer;