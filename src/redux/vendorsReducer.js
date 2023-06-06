//Action Type
import {vendorsAPI} from "../api/api";

const SET_CABINET = 'kadabra/vendorsReducer/SET_CABINET';
const SET_TOTAL_STATISTICS = 'kadabra/vendorsReducer/SET_TOTAL_STATISTICS';

let initialState = {
    cabinet: '',
    totalStatistics: ''
}

const vendorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CABINET:
            return {
                ...state,
                cabinet: action.payload
            }
        case SET_TOTAL_STATISTICS:
            return {
                ...state,
                totalStatistics: action.payload
            }
        default:
            return state;
    }
}

let setCabinet = (data) => ({type: SET_CABINET, payload: {...data}})
let setTotalStatistics = (data) => ({type: SET_TOTAL_STATISTICS, payload: {...data}})


export let createCabinet = (data) => (dispatch) => {
    vendorsAPI.vendorCreate(data)
}

export let updatePhotoCabinet = (file) => async (dispatch) => {
    let data = await vendorsAPI.updatePhotoCabinet(file)
    return data
}

export let getCabinet = () => async (dispatch) => {
    let data = await vendorsAPI.getCabinet();
    dispatch(setCabinet(data))
    return data;
}

export let getTotalStatistics = () => async (dispatch) => {
    let data = await vendorsAPI.getTotalStatistics()
    dispatch(setTotalStatistics(data))
    return data;
}


export default vendorReducer;
