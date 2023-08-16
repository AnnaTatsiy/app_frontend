// получить расписание от сервера
import {toast} from "react-toastify";

import {GET_SCHEDULE} from "./action_const";
import ScheduleService from "../../services/scheduleService";

export const getSchedule = () =>
    async (dispatch) =>{
        try{
            const response = await ScheduleService.getAll();
            dispatch({type: GET_SCHEDULE, payload: response.data})
        }catch (error){
            toast.error('Возникла ошибка при получении расписания')
        }
    };