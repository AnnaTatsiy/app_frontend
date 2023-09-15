import {
    ADD_LIMITED_SUBSCRIPTION, GET_ABOUT_LIMITED_SUBSCRIPTION,
    GET_ALL_LIMITED_SUBSCRIPTIONS,
    GET_LIMITED_SUBSCRIPTIONS
} from "../../actions/limitedSubscriptions/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    fullList: [],
    selectedSubscription: null,
    errors: [],
    state: ""
}

export default function limitedSubscriptionReducer(state = initialState, action){

    switch (action.type){

        case GET_ALL_LIMITED_SUBSCRIPTIONS:
            return {
                ...state,
                fullList: action.payload
            }

        case GET_LIMITED_SUBSCRIPTIONS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page
            }

        //добавление
        case ADD_LIMITED_SUBSCRIPTION:
            if(action.payload.status === "success"){
                return {
                    ...state,
                    state: "success",
                    list: [...state.list, action.payload.answer],
                    fullList: [...state.fullList, action.payload.answer]
                }
            } else {
                return {
                    ...state,
                    state: "failed",
                    errors: action.payload.errors
                }
            }

        case GET_ABOUT_LIMITED_SUBSCRIPTION:
            return {
                ...state,
                selectedSubscription: action.payload
            }

        default:
            return state;
    }
}