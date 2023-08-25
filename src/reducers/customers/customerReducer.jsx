
// начальное состояние
import {
    ADD_CUSTOMER,
    EDIT_CUSTOMER,
    GET_CUSTOMERS,
    GET_ALL_CUSTOMERS,
} from "../../actions/customers/action_const";

const initialState = {
    list: [],
    lastPage: 1,
    dataList: []
}

export default function customersReducer(state = initialState, action){

    switch (action.type){

        //список клиентов
        case GET_ALL_CUSTOMERS:
            return {
                ...state,
                dataList: action.payload,
            }

        //список клиентов постранично
        case GET_CUSTOMERS:
            return {
                ...state,
                list: action.payload.data,
                lastPage: action.payload.last_page
            }

        //добавление клиента
        case ADD_CUSTOMER:
            return {
                ...state,
                list: [...state.list, action.payload],
                dataList: [...state.dataList, action.payload]
            }

         // редактирование клиента
        case EDIT_CUSTOMER:
            const updatedCustomer = action.payload;
            return {
                ...state,
                list: state.list.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer),
                dataList: state.dataList.map(customer => customer.id === updatedCustomer.id ? updatedCustomer : customer),
            }

        default:
            return state;
    }
}