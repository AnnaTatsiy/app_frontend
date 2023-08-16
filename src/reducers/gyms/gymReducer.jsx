import {GET_ALL_GYMS} from "../../actions/gyms/action_const";


const initialState = {
    list: []
}

export default function gymReducer(state = initialState, action){

    switch (action.type){

        case GET_ALL_GYMS:
            return {
                ...state,
                list: action.payload
            }

        default:
            return state;
    }
}