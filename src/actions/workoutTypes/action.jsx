import {toast} from "react-toastify";
import WorkoutTypesService from "../../services/workoutTypesService";
import {GET_ALL_WORKOUT_TYPES} from "./action_const";

export const getAllWorkoutTypes = () =>
    async (dispatch) => {
        try {
            const response = await WorkoutTypesService.getAll();
            dispatch({type: GET_ALL_WORKOUT_TYPES, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка типов тренеровок')
        }
    };