import {GET_SCHEDULE} from "../../actions/schedules/action_const";

// начальное состояние
const initialState = {
    list: []
}

export default function scheduleReducer(state = initialState, action){
    switch (action.type){
        //вывод расписания
        case GET_SCHEDULE:
            return {
                ...state,
                list: action.payload
            }

        default:
            return state;
    }
}