import {
    ADD_SING_UP_GROUP_WORKOUT,
    GET_SING_UP_GROUP_WORKOUTS_BY_ID
} from "../../actions/signUpGroupWorkouts/action_const";

const initialState = {
    list: [],
    listForCustomer: []
}

export default function signUpGroupWorkoutReducer(state = initialState, action){

    switch (action.type){

        case GET_SING_UP_GROUP_WORKOUTS_BY_ID:
            return {
                ...state,
                list: action.payload
            }

        case ADD_SING_UP_GROUP_WORKOUT:
            return {
                ...state,
                listForCustomer: [...state.listForCustomer, action.payload] //TODO проверить
            }

        default:
            return state;
    }
}