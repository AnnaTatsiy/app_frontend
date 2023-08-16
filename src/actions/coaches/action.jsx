import {toast} from "react-toastify";

import CoachesService from "../../services/coachesService.jsx";
import {GET_COACHES, ADD_COACH, EDIT_COACH, GET_ALL_COACHES} from "./action_const";

// получение списка клиентов от сервера
export const getAllCoaches = () =>
    async (dispatch) => {
        try {
            const response = await CoachesService.getAllCoaches();
            dispatch({type: GET_ALL_COACHES, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка тренеров')
        }
    };

// получение списка тренеров от сервера постранично
export const getCoaches = (number) =>
    async (dispatch) => {
        try {
            const response = await CoachesService.getAll(number);
            dispatch({type: GET_COACHES, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка тренеров')
        }
    };

// добавление тренера
export const addCoach = (coach) =>
    async (dispatch) => {
        try {
            const response = await CoachesService.add(coach);
            dispatch({type: ADD_COACH, payload: response.data});
            toast.success(`Тренер успешно добавлен!`);
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при добавлении тренера'}`);
        }
    };

//Редактироание тренера
export const editCoach = (coach) =>
    async (dispatch) => {
        try {
            const response = await CoachesService.edit(coach);
            dispatch({type: EDIT_COACH, payload: response.data});
            toast.success(`Тренер успешно редактирован!`);
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при редактировании тренера'}`);
        }
    };