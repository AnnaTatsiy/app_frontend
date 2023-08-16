// получение списка спортзалов от сервера
import GymsService from "../../services/gymsService";
import {GET_ALL_GYMS} from "./action_const";
import {toast} from "react-toastify";

export const getAllGyms = () =>
    async (dispatch) => {
        try {
            const response = await GymsService.getAll();
            dispatch({type: GET_ALL_GYMS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка спортзалов')
        }
    };