import {
    ADD_UNLIMITED_SUBSCRIPTION, GET_ABOUT_SUBSCRIPTION,
    GET_ALL_UNLIMITED_SUBSCRIPTIONS,
    GET_UNLIMITED_SUBSCRIPTIONS
} from "../../actions/unlimitedSubscriptions/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    fullList: [],
    selectedSubscription: null
}

export default function unlimitedSubscriptionReducer(state = initialState, action){

    switch (action.type){

        case GET_ALL_UNLIMITED_SUBSCRIPTIONS:
            return {
                ...state,
                fullList: action.payload
            }

        case GET_UNLIMITED_SUBSCRIPTIONS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page
            }

        //добавление
        case ADD_UNLIMITED_SUBSCRIPTION:
            return {
                ...state,
                list: [...state.list, action.payload],
                fullList: [...state.fullList, action.payload]
            }

        case GET_ABOUT_SUBSCRIPTION:
            return {
                ...state,
                selectedSubscription: action.payload
            }

        default:
            return state;
    }
}