import {toast} from "react-toastify";
import SignUpGroupWorkoutsService from "../../services/signUpGroupWorkoutsService";
import {GET_SING_UP_GROUP_WORKOUTS_BY_ID} from "./action_const";

export const getSignUpGroupWorkoutsById = (id) =>
    async (dispatch) => {
        try {
            const response = await SignUpGroupWorkoutsService.getById(id);
            dispatch({type:GET_SING_UP_GROUP_WORKOUTS_BY_ID, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка клиентов записанных на групповую тренировку')
        }
    };