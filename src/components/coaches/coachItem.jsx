// компонент вывода одного клиента

import {PencilFill} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";

export default function CoachItem({coach, onClick}){
    return (
        <>
            <tr>
                <td>{coach.passport}</td>
                <td>{coach.name.slice(0, 1)}. {coach.patronymic.slice(0, 1)}. {coach.surname}</td>
                <td>{coach.number}</td>
                <td>{coach.mail}</td>
                <td>{coach.registration}</td>
                <td>
                    <Button variant={"primary"} onClick={() => onClick(coach.id)}>
                        <PencilFill/></Button>
                </td>
            </tr>
        </>
    )
}