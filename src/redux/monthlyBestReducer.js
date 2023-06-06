//Action Type
import { monthlyBestAPI } from "../api/api";

const SET_MONTHLY_BEST = 'kadabra/monthlyBestReducer/SET_MONTHLY_BEST';

let initialState = {
    monthlyBest: '',
}

const monthlyBestReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MONTHLY_BEST:
            return {
                ...state,
                monthlyBest: action.monthlyBest
            }
        default:
            return state
    }
}

//Action Creators
let setMonthlyBest = (monthlyBest) => ({ type: SET_MONTHLY_BEST, monthlyBest })

//Thunk

export let cleanMonthlyBest = () => async (dispatch) => {
    dispatch(setMonthlyBest(''));
}

export let getMonthlyBest = (params) => async (dispatch) => {
    let data = await monthlyBestAPI.getMonthlyBest(params);
    dispatch(setMonthlyBest(data));
}

export default monthlyBestReducer;
