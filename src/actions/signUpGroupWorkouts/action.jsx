import {toast} from "react-toastify";
import SignUpGroupWorkoutsService from "../../services/signUpGroupWorkoutsService";
import {
    ADD_SING_UP_GROUP_WORKOUT,
    DELETE_SING_UP_GROUP_WORKOUT,
    GET_SING_UP_GROUP_WORKOUTS_BY_ID
} from "./action_const";

export const getSignUpGroupWorkoutsById = (id) =>
    async (dispatch) => {
        try {
            const response = await SignUpGroupWorkoutsService.getById(id);
            dispatch({type: GET_SING_UP_GROUP_WORKOUTS_BY_ID, payload: response.data});
        } catch (error) {
            toast.error('Возникла ошибка при получении списка клиентов записанных на групповую тренировку')
        }
    };

// добавить запись
export const addSignUpGroupWorkout = (id) =>
    async (dispatch) => {
        try {
            const response = await SignUpGroupWorkoutsService.add(id);
            dispatch({type: ADD_SING_UP_GROUP_WORKOUT, payload: response.data});
        } catch (error) {
            toast.error('Возникла ошибка при регистрации на групповую тренировку')
        }
    };

// удалить запись
export const deleteSignUpGroupWorkout = (id) =>
    async (dispatch) => {
        try {
            const response = await SignUpGroupWorkoutsService.delete(id);
            dispatch({type: DELETE_SING_UP_GROUP_WORKOUT, payload: response.data});
            toast.warning(`Вы отменили групповую тренировку`);
        } catch (error) {
            toast.error('Возникла ошибка при отмене групповой тренировки')
        }
    };