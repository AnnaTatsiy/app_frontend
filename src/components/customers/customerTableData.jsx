// компонент вывода одного клиента

import {PencilFill} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";

export default function CustomerTableData({customer, onClick}){
    return (
        <>
            <tr>
                <td>{customer.passport}</td>
                <td>{customer.name.slice(0, 1)}. {customer.patronymic.slice(0, 1)}. {customer.surname}</td>
                <td>{customer.number}</td>
                <td>{customer.mail}</td>
                <td>{customer.registration}</td>
                <td>
                    <Button variant={"primary"} onClick={() => onClick(customer.id)}>
                        <PencilFill/></Button>
                </td>
            </tr>
        </>
    )
}