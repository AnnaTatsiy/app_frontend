// начальное состояние
import {
    EDIT_GROUP_WORKOUT, FILTERING_GROUP_WORKOUTS,
    GET_GROUP_WORKOUT_BY_ID,
    GET_GROUP_WORKOUTS, GET_GROUP_WORKOUTS_BY_SCHEDULE
} from "../../actions/groupWorkouts/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    selectedPage: 1,
    selectedWorkout: null,
    isFiltered: null
}

export default function groupWorkoutReducer(state = initialState, action){

    switch (action.type){

        //список групповых тренировок постранично
        case GET_GROUP_WORKOUTS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page,
                selectedPage: action.payload.current_page,
                isFiltered: false
            }

        case GET_GROUP_WORKOUT_BY_ID:
            return {
                ...state,
                selectedWorkout: action.payload
            }

        case EDIT_GROUP_WORKOUT:
            const updatedWorkout = action.payload;
            return {
                ...state,
                list: state.list.map(workout => workout.id === updatedWorkout.id ? updatedWorkout : workout)
            }

        case FILTERING_GROUP_WORKOUTS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page,
                selectedPage: action.payload.current_page,
                isFiltered: true
            }

        case GET_GROUP_WORKOUTS_BY_SCHEDULE:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page,
                selectedPage: action.payload.current_page,
                isFiltered: false
            }

        default:
            return state;
    }
}