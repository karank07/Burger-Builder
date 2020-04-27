import * as actionType from '../actions/actionType';
import { updateState } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};
const purchaseBurgerFail = (state, action) => {
    const newOrder = updateState(action.orderData, { id: action.orderId });
    return updateState(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};
const fetchOrdersSuccess = (state, action) => {
    return updateState(state, {
        orders: action.orders,
        loading: false
    });
};
const reducer = (state = initialState, action) => {
    switch (actionType) {
        case actionType.PURCHASE_INIT: return updateState(state, { purchased: false });
        case actionType.PURCHASE_BURGER_START: return updateState(state, { loading: true });
        case actionType.PURCHASE_BURGER_SUCCESS: return purchaseBurgerFail(state, action);
        case actionType.PURCHASE_BURGER_FAIL: return updateState(state, { loading: false });
        case actionType.FETCH_ORDERS_START: return updateState(state, { loading: true });
        case actionType.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionType.FETCH_ORDERS_FAIL: return updateState(state, { loading: false });
        default:
            return { state };
    }
}
export default reducer;