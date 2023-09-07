
// начальное состояние
import {ADD_COACH, EDIT_COACH, GET_COACHES, GET_ALL_COACHES, GET_COACH} from "../../actions/coaches/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    dataList: [],
    authCoach: null
}

export default function coachesReducer(state = initialState, action){

    switch (action.type){

        //список тренера
        case GET_ALL_COACHES:
            return {
                ...state,
                dataList: action.payload
            }

        //список тренера постранично
        case GET_COACHES:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page
            }

        //добавление тренера
        case ADD_COACH:
            return {
                ...state,
                list: [...state.list, action.payload],
                dataList: [...state.dataList, action.payload]
            }

        // редактирование тренера
        case EDIT_COACH:
            const updatedCoach = action.payload;
            return {
                ...state,
                list: state.list.map(coach => coach.id === updatedCoach.id ? updatedCoach : coach),
                dataList: state.dataList.map(coach => coach.id === updatedCoach.id ? updatedCoach : coach),
            }

        case GET_COACH:
            return {
                ...state,
                authCoach: action.payload
            }

        default:
            return state;
    }
}