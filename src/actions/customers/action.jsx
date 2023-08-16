import {toast} from "react-toastify";

import CustomersService from "../../services/customersService";
import {GET_CUSTOMERS, ADD_CUSTOMER, EDIT_CUSTOMER, GET_ALL_CUSTOMERS} from "./action_const";

// получение списка клиентов от сервера
export const getAllCustomers = () =>
    async (dispatch) => {
        try {
            const response = await CustomersService.getAllCustomers();
            dispatch({type: GET_ALL_CUSTOMERS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка клиентов')
        }
    };

// получение списка клиентов от сервера постранично
export const getCustomers = (number) =>
    async (dispatch) => {
        try {
            const response = await CustomersService.getAll(number);
            dispatch({type: GET_CUSTOMERS, payload: response.data});
        } catch (error){
            toast.error('Возникла ошибка при получении списка клиентов')
        }
    };

// добавление клиента
export const addCustomer = (customer) =>
    async (dispatch) => {
        try {
            const response = await CustomersService.add(customer);
            dispatch({type: ADD_CUSTOMER, payload: response.data});
            toast.success(`Клиент успешно добавлен!`);
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при добавлении клиента'}`);
        }
    };

//Редактироание клиента
export const editCustomer = (customer) =>
    async (dispatch) => {
        try {
            const response = await CustomersService.edit(customer);
            dispatch({type: EDIT_CUSTOMER, payload: response.data});
            toast.success(`Клиент успешно редактирован!`);
        } catch (error){
            toast.error(`${error.response?.data?.message ?? 'Возникла ошибка при редактировании клиента'}`);
        }
    };