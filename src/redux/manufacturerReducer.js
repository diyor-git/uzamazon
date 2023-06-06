//Action Type
import { manufacturerAPI } from "../api/api";

const SET_MANUFACTURER = 'kadabra/manufacturerReducer/SET_MANUFACTURER'
const SET_MANUFACTURER_LIST = 'kadabra/manufacturerReducer/SET_MANUFACTURER_LIST'

let initialState = {
    manufacturer: '',
    manufacturerList: '',
}

const manufacturerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MANUFACTURER:
            return {
                ...state,
                manufacturer: action.manufacturer
            }

        case SET_MANUFACTURER_LIST:
            return {
                ...state,
                manufacturerList: action.manufacturerList
            }

        default:
            return state
    }
}

//Action Creators
let setManufacturer = (manufacturer) => ({ type: SET_MANUFACTURER, manufacturer })
let setManufacturerList = (manufacturerList) => ({ type: SET_MANUFACTURER_LIST, manufacturerList })
//Thunk

export let cleanManufacturer = () => async (dispatch) => {
    dispatch(setManufacturer(''));
}

export let getManufacturer = (manufacturer) => async (dispatch) => {
    let data = await manufacturerAPI.getManufacturer(manufacturer);
    dispatch(setManufacturer(data));
}

export let getManufacturerList = () => async (dispatch) => {
    let data = await manufacturerAPI.getManufacturerList();
    dispatch(setManufacturerList(data));
}

export default manufacturerReducer;
