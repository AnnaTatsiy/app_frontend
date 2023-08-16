import {GET_ALL_LIMITED_PRICE_LISTS, GET_LIMITED_PRICE_LISTS} from "../../actions/limitedPriceLists/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    fullList: []
}

export default function limitedPriceListReducer(state = initialState, action){
    switch (action.type){

        case GET_ALL_LIMITED_PRICE_LISTS:
            return {
                ...state,
                fullList: action.payload
            }

        case GET_LIMITED_PRICE_LISTS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page
            }

        default:
            return state;
    }
}