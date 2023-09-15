import {toast} from "react-toastify";
import SignUpPersonalWorkoutsService from "../../services/signUpPersonalWorkoutsService";
import {
    FILTERING_PERSONAL_WORKOUTS,
    GET_ALL_SING_UP_PERSONAL_WORKOUTS,
    GET_SING_UP_PERSONAL_WORKOUTS_BY_COACH
} from "./action_const";

// получить список тренировок заданного тренера постранично

export const getSignUpPersonalWorkoutsByCoach = (id, page) =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.getAllByCoach(id, page);
            dispatch({type:GET_SING_UP_PERSONAL_WORKOUTS_BY_COACH, payload: response.data});
        } catch (error){
            //toast.error('Возникла ошибка при получении списка персональных тренировок')
        }
    };

export const getSignUpPersonalWorkouts = (number) =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.getAll(number);
            dispatch({type:GET_ALL_SING_UP_PERSONAL_WORKOUTS, payload: response.data});
        } catch (error){
           // toast.error('Возникла ошибка при получении списка персональных тренировок')
        }
    };

export const filteringPersonalWorkouts = (params) =>
    async (dispatch) => {
        try {
            const response = await SignUpPersonalWorkoutsService.filtering(params);
            dispatch({type: FILTERING_PERSONAL_WORKOUTS, payload: response.data});
        } catch (error){
            //toast.error('Возникла ошибка при фильтрации персональных тренировок')
        }
    };