//Action Type
import { productAPI } from "../api/api";

const SET_PRODUCT_DETAIL = 'kadabra/productReducer/SET_PRODUCT_DETAIL'
const SET_PRODUCT_CART = 'kadabra/productReducer/SET_PRODUCT_CART'
const SET_CART_LENGTH = 'kadabra/productReducer/SET_CART_LENGTH'
const SET_CART_DETAIL = 'kadabra/productReducer/SET_CART_DETAIL'
const SET_SEARCH_PRODUCT = 'kadabra/productReducer/SET_SEARCH_PRODUCT'
const SET_SEARCH_TEXT = 'kadabra/productReducer/SET_SEARCH_TEXT'
const SET_REVIEW_LIST = 'kadabra/productReducer/SET_REVIEW_LIST'
const SET_REVIEW_DETAIL = 'kadabra/productReducer/SET_REVIEW_DETAIL'
const SET_BUY_SINGLE_PRODUCT_DETAIL = 'kadabra/productReducer/SET_BUY_SINGLE_PRODUCT_DETAIL'

let initialState = {
    productDetail: '',
    cartLength: '',
    cartDetail: '',
    searchProduct: '',
    searchText: '',
    reviewList: '',
    reviewDetail: '',
    buySingleProductDetail: '',
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCT_DETAIL:
            return {
                ...state,
                productDetail: action.detail
            }
        case SET_PRODUCT_CART:
            return {
                ...state,
                cart: action.products
            }
        case SET_CART_LENGTH:
            return {
                ...state,
                cartLength: action.length
            }
        case SET_CART_DETAIL:
            return {
                ...state,
                cartDetail: action.detail
            }
        case SET_SEARCH_PRODUCT:
            return {
                ...state,
                searchProduct: action.product
            }
        case SET_SEARCH_TEXT:
            return {
                ...state,
                searchText: action.text
            }
        case SET_REVIEW_LIST:
            return {
                ...state,
                reviewList: action.list
            }
        case SET_REVIEW_DETAIL:
            return {
                ...state,
                reviewDetail: action.detail
            }
        case SET_BUY_SINGLE_PRODUCT_DETAIL:
            return {
                ...state,
                buySingleProductDetail: action.buySingleProductDetail
            }
        default:
            return state
    }
}

//Action Creators
let setProductDetail = (detail) => ({ type: SET_PRODUCT_DETAIL, detail })
let setProductCart = (products) => ({ type: SET_PRODUCT_CART, products })
let setCartLength = (length) => ({ type: SET_CART_LENGTH, length })
let setCartDetail = (detail) => ({ type: SET_CART_DETAIL, detail })
let setSearchProduct = (product) => ({ type: SET_SEARCH_PRODUCT, product })
let setSearchText = (text) => ({ type: SET_SEARCH_TEXT, text })
let setReviewList = (list) => ({ type: SET_REVIEW_LIST, list })
let setReviewDetail = (detail) => ({ type: SET_REVIEW_DETAIL, detail })
let setBuySingleProductDetail = (buySingleProductDetail) => ({ type: SET_BUY_SINGLE_PRODUCT_DETAIL, buySingleProductDetail })

//Thunk

export let cleanProductDetail = () => async (dispatch) => {
    dispatch(setProductDetail(''));
}

export let cleanReviewDetail = () => async (dispatch) => {
    dispatch(setReviewDetail(''));
}

export let getProductDetail = (slug) => async (dispatch) => {
    let data = await productAPI.getProductDetail(slug)
    dispatch(setProductDetail(data));
}

export let getProductsCart = () => async (dispatch) => {
    let data = await productAPI.getProductsCart()
    dispatch(setProductCart(data))
}

export let addBuySingleProduct = (buySingleProductDetail) => async (dispatch) => {
    dispatch(setBuySingleProductDetail(buySingleProductDetail));
}

export let addProductsCart = (id) => async (dispatch) => {
    let data = await productAPI.addProductCart(id)
}

export let deleteProductCart = (id) => async (dispatch) => {
    let data = await productAPI.deleteProductCart(id)
}

export let getCartLength = () => async (dispatch) => {
    let data = await productAPI.getCartLength()
    dispatch(setCartLength(data.cart_length))
}

export let getCartDetail = () => async (dispatch) => {
    let data = await productAPI.getCartDetail()
    dispatch(setCartDetail(data))
}

export let getSearchProduct = (search) => async (dispatch) => {
    let data = await productAPI.searchProduct(search)
    dispatch(setSearchProduct(data))
}

export let cleanSearchProduct = () => async (dispatch) => {
    dispatch(setSearchProduct({}))
}

export let getSearchText = (text) => async (dispatch) => {
    dispatch(setSearchText(text))
}

export let getReviewList = (slug, queries) => async (dispatch) => {
    let data = await productAPI.getReviewList(slug, queries)
    dispatch(setReviewList(data))
}

export let getReviewDetail = (slug) => async (dispatch) => {
    let data = await productAPI.getReviewDetail(slug)
    dispatch(setReviewDetail(data))
}

export let createReview = (slug, request) => async (dispatch) => {
    let data = await productAPI.createReview(slug, request)
}

export default productReducer;
