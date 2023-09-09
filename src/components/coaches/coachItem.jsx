// компонент вывода одного клиента

import {InfoSquareFill, PencilFill} from "react-bootstrap-icons";
import {Button} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export default function CoachItem({coach, onClick}){
    return (
        <>
            <tr>
                <td>{coach.passport}</td>
                <td>{coach.name.slice(0, 1)}. {coach.patronymic.slice(0, 1)}. {coach.surname}</td>
                <td>{coach.number}</td>
                <td>{coach.mail}</td>
                <td>{coach.registration}</td>
                <td className={"text-md-center"}>
                    <Button variant={"success"} className={"fs-6"} onClick={() => onClick(coach.id)}>
                        <PencilFill/></Button>
                </td>
                <td className={"text-md-center"}>
                    <NavLink className={"fs-3"} to={`/personal-workouts/select-workouts-by-coach?id=${coach.id}&page=2`}
                             placeholder={"Показать тренировки..."}>
                        <InfoSquareFill/>
                    </NavLink>
                </td>
            </tr>
        </>
    )
}