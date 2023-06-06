//Action Type
import { categoryAPI } from "../api/api";

const SET_CATEGORY = 'kadabra/categoryReducer/SET_CATEGORY'
const SET_CATEGORY_LIST = 'kadabra/categoryReducer/SET_CATEGORY_LIST'

let initialState = {
    category: '',
    categoryList: '',
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CATEGORY:
            return {
                ...state,
                category: action.category
            }

        case SET_CATEGORY_LIST:
            return {
                ...state,
                categoryList: action.categoryList
            }

        default:
            return state
    }
}

//Action Creators
let setCategory = (category) => ({ type: SET_CATEGORY, category })
let setCategoryList = (categoryList) => ({ type: SET_CATEGORY_LIST, categoryList })
//Thunk

export let cleanCategory = () => async (dispatch) => {
    dispatch(setCategory(null));
}

export let getCategory = (category) => async (dispatch) => {
    let data = await categoryAPI.getCategory(category);
    dispatch(setCategory(data));
}

export let getCategoryList = () => async (dispatch) => {
    let data = await categoryAPI.getCategoryList();
    dispatch(setCategoryList(data));
}

export default categoryReducer;
