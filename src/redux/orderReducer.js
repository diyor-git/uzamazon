//Action Type
import { orderAPI } from "../api/api";

const SET_ORDER_INIT_LIST = 'kadabra/orderReducer/SET_ORDER_INIT_LIST';

let initialState = {
    orderInitList: '',
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER_INIT_LIST:
            return {
                ...state,
                orderInitList: action.orderInitList
            }
        default:
            return state;
    }
}

let setOrderInitList = (orderInitList) => ({ type: SET_ORDER_INIT_LIST, orderInitList })

export let createOrder = (data) => async (dispatch) => {
    await orderAPI.createOrder(data);
}

export let initOrder = () => async (dispatch) => {
    let data = await orderAPI.initOrder();
    dispatch(setOrderInitList(data));
}

export default productReducer;
