import {GET_SING_UP_GROUP_WORKOUTS_BY_ID} from "../../actions/signUpGroupWorkouts/action_const";

const initialState = {
    list: []
}

export default function signUpGroupWorkoutReducer(state = initialState, action){

    switch (action.type){

        case GET_SING_UP_GROUP_WORKOUTS_BY_ID:
            return {
                ...state,
                list: action.payload
            }

        default:
            return state;
    }
}