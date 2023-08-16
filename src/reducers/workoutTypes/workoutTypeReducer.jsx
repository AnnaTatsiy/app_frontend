import {GET_ALL_WORKOUT_TYPES} from "../../actions/workoutTypes/action_const";

const initialState = {
    list: []
}

export default function workoutTypeReducer(state = initialState, action){

    switch (action.type){

        case GET_ALL_WORKOUT_TYPES:
            return {
                ...state,
                list: action.payload
            }

        default:
            return state;

    }
}