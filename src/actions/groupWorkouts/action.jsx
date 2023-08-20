import {toast} from "react-toastify";

import {
    EDIT_GROUP_WORKOUT,
    FILTERING_GROUP_WORKOUTS,
    GET_GROUP_WORKOUT_BY_ID,
    GET_GROUP_WORKOUTS, GET_GROUP_WORKOUTS_BY_SCHEDULE
} from "./action_const";
import GroupWorkoutsService from "../../services/groupWorkoutsService";

// получение списка групповых тренировок от сервера постранично
export const getGroupWorkouts = (number) =>
    async (dispatch) => {
        try {
            const response = await GroupWorkoutsService.getAll(number);
            dispatch({type: GET_GROUP_WORKOUTS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка групповых тренировок')
        }
    };

// получить групповую тренировку по id
export const getGroupWorkoutById = (id) =>
    async (dispatch) => {
        try {
            const response = await GroupWorkoutsService.getById(id);
            dispatch({type: GET_GROUP_WORKOUT_BY_ID, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении групповой тренировки')
        }
    };

export const editGroupWorkout = (workout) =>
    async (dispatch) => {
        try {
            const response = await GroupWorkoutsService.edit(workout);
            dispatch({type: EDIT_GROUP_WORKOUT, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при редактировании групповой тренировки')
        }
    };

export const filteringGroupWorkouts = (params) =>
    async (dispatch) => {
        try {
            const response = await GroupWorkoutsService.filtering(params);
            dispatch({type: FILTERING_GROUP_WORKOUTS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при фильтрации групповых тренировок')
        }
    };

export const getGroupWorkoutsBySchedule = (id, page) =>
    async (dispatch) => {
        try {
            const response = await GroupWorkoutsService.getBySchedule(id, page);
            dispatch({type: GET_GROUP_WORKOUTS_BY_SCHEDULE, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении групповых тренировок')
        }
    };