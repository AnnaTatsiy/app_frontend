// начальное состояние
import {
    EDIT_GROUP_WORKOUT, FILTERING_GROUP_WORKOUTS, GET_AVAILABLE_WORKOUTS,
    GET_GROUP_WORKOUT_BY_ID,
    GET_GROUP_WORKOUTS, GET_GROUP_WORKOUTS_BY_SCHEDULE, GET_SIGN_UP_WORKOUTS
} from "../../actions/groupWorkouts/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    selectedPage: 1,
    selectedWorkout: null,
    isFiltered: null,
    availableWorkouts: [],
    signUpWorkouts: []
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

        // получить все доступные тренировки для записи клиента
        case GET_AVAILABLE_WORKOUTS:
            return {
                ...state,
                availableWorkouts: action.payload
            }

        case GET_SIGN_UP_WORKOUTS:
            return {
                ...state,
                signUpWorkouts: action.payload
            }

        default:
            return state;
    }
}