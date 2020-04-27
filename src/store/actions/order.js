import * as actionType from './actionType';
import axios from '../../axios-order';
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};
export const purchaseBurgerFail = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    };
};
export const purchaseStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    };
};

export const purchase = (orderData) => {
    return dispatch => {
        dispatch(purchaseStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrderFail = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionType.FETCH_ORDERS_START
    };
};

export const fetchOrder = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(res => {
                const Porder = [];
                for (let k in res.data) {
                    Porder.push({
                        ...res.data[k],
                        id: k
                    });
                }
                dispatch(fetchOrderSuccess(Porder));
                
            })
            .catch(err => {
                dispatch(fetchOrderFail(err));
            })
    }
};