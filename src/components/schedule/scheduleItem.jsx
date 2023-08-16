//компонент вывода расписания одного дня
import {NavLink} from "react-router-dom";
import {InfoSquareFill} from "react-bootstrap-icons";

export default function ScheduleItem({schedule}){

    return (
        <>
            <tr>
                <td>{schedule.time_begin.slice(0, 5)} - {schedule.time_end.slice(0, 5)}</td>
                <td>{schedule.workout_type.title}</td>
                <td>{schedule.coach.name.slice(0, 1)}. {schedule.coach.patronymic.slice(0, 1)}. {schedule.coach.surname}</td>
                <td>{schedule.gym.title.replace("№", "")}</td>
                <td className={"text-md-center"}>
                    <NavLink className={"fs-3"} to={`/group-workouts/select-workouts-by-schedule?id=${schedule.id}`}
                             placeholder={"Показать тренировки..."}>
                        <InfoSquareFill/>
                    </NavLink>
                </td>
            </tr>
        </>
    )
}