import {toast} from "react-toastify";

import LimitedSubscriptionsService from "../../services/limitedSubscriptionsService";
import {
    GET_LIMITED_SUBSCRIPTIONS,
    GET_ALL_LIMITED_SUBSCRIPTIONS,
    ADD_LIMITED_SUBSCRIPTION,
    GET_ABOUT_LIMITED_SUBSCRIPTION
} from "./action_const";

// получить информацию о абонементе для авторизированного клиента
export const getAboutLimitedSubscription = () =>
    async (dispatch) => {
        try {
            const response = await LimitedSubscriptionsService.getAboutSubscription();
            dispatch({type: GET_ABOUT_LIMITED_SUBSCRIPTION, payload: response.data});
        } catch (error){
            //toast.error('Возникла ошибка при информацию о абонементе с тренером')
        }
    };

// получить список всех подписок на тренировки с тренером
export const getAllLimitedSubscriptions = () =>
    async (dispatch) => {
        try {
            const response = await LimitedSubscriptionsService.getAllLimitedSubscriptions();
            dispatch({type: GET_ALL_LIMITED_SUBSCRIPTIONS, payload: response.data});
        } catch (error){
            //toast.error('Возникла ошибка при получении подписок на тренировки с тренером')
        }
    };

// получить список всех подписок на тренировки с тренером постранично
export const getLimitedSubscriptions = (number) =>
    async (dispatch) => {
        try {
            const response = await LimitedSubscriptionsService.getAll(number);
            dispatch({type: GET_LIMITED_SUBSCRIPTIONS, payload: response.data});
        } catch (error){
           // toast.error('Возникла ошибка при получении подписок на тренировки с тренером')
        }
    };

// добавление
export const addLimitedSubscription = (subscription) =>
    async (dispatch) => {
        try {
            const response = await LimitedSubscriptionsService.add(subscription);
            dispatch({type: ADD_LIMITED_SUBSCRIPTION, payload: response.data});
            toast.success(`Тренировки с тренером успешно оформлены!`);
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при оформлении тренировок с тренером'}`);
        }
    };
