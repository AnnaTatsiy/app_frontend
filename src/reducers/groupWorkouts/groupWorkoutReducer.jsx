// начальное состояние
import {
    EDIT_GROUP_WORKOUT, FILTERING_GROUP_WORKOUTS, GET_AVAILABLE_WORKOUTS,
    GET_GROUP_WORKOUT_BY_ID,
    GET_GROUP_WORKOUTS, GET_GROUP_WORKOUTS_BY_SCHEDULE, GET_SIGN_UP_WORKOUTS
} from "../../actions/groupWorkouts/action_const";
import {
    ADD_SING_UP_GROUP_WORKOUT,
    DELETE_SING_UP_GROUP_WORKOUT
} from "../../actions/signUpGroupWorkouts/action_const.jsx";
import {toast} from "react-toastify";

const initialState = {
    list: [],
    lastPage: 1,
    selectedPage: 1,
    selectedWorkout: null,
    isFiltered: null,
    availableWorkouts: [],
    signUpWorkouts: [],
    addedSignUp: null
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

        // получить все тренировки на которые был записан клиент
        case GET_SIGN_UP_WORKOUTS:
            return {
                ...state,
                signUpWorkouts: action.payload
            }

        // добавляем запись на групповую тренировку, реагирует таблица доступных групповых тренировок для клиента
        case ADD_SING_UP_GROUP_WORKOUT:
            const payload =  action.payload
            if(payload.length > 1){
                toast.error(`Возможна запись только на две тренировки в один день.`);
                return state;
            } else {
                toast.success(`Вы зарегистрировались на групповую тренировку`);
                return {
                    ...state,
                    availableWorkouts: state.availableWorkouts.filter((w) => w.id !== payload.group_workout_id)
                }
            }

        // удаляем запись на групповую тренировку, реагирует таблица групповых тренировок на которые был записан клиент
        case DELETE_SING_UP_GROUP_WORKOUT:
            return {
                ...state,
                signUpWorkouts: state.signUpWorkouts.filter((w) => w.id !== action.payload.group_workout_id)
            }

        default:
            return state;
    }
}