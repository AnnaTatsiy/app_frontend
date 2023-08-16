import {toast} from "react-toastify";
import LimitedPriceListsService from "../../services/limitedPriceListsService";
import {GET_ALL_LIMITED_PRICE_LISTS, GET_LIMITED_PRICE_LISTS} from "./action_const";

// получить прайс лист
export const getAllLimitedPriceLists = () =>
    async (dispatch) => {
        try {
            const response = await LimitedPriceListsService.getAllLimitedPriceLists();
            dispatch({type: GET_ALL_LIMITED_PRICE_LISTS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении прайс листа на тренировки с тренером')
        }
    };

// получить прайс лист постранично
export const getLimitedPriceLists = (number) =>
    async (dispatch) => {
        try {
            const response = await LimitedPriceListsService.getAll(number);
            dispatch({type: GET_LIMITED_PRICE_LISTS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении прайс листа на тренировки с тренером')
        }
    };
