import {
    FILTERING_PERSONAL_WORKOUTS,
    GET_ALL_SING_UP_PERSONAL_WORKOUTS
} from "../../actions/signUpPersonalWorkouts/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    selectedPage: 1,
    isFiltered: null
}

export default function signUpPersonalWorkoutReducer(state = initialState, action){
    switch (action.type){

        //список тренировок постранично
        case GET_ALL_SING_UP_PERSONAL_WORKOUTS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page,
                selectedPage: action.payload.current_page,
                isFiltered: false
            }

        case FILTERING_PERSONAL_WORKOUTS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page,
                selectedPage: action.payload.current_page,
                isFiltered: true
            }

        default:
            return state;
    }
}