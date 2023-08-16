import {InfoSquareFill} from "react-bootstrap-icons";
import {FormCheck} from "react-bootstrap";
import {NavLink} from "react-router-dom";

export default function GroupWorkoutsTableData({workout, onClick}) {
    return (
        <>
            <tr>
                <td>{workout.schedule.day.title}</td>
                <td>{workout.schedule.time_begin.slice(0, 5)}</td>
                <td>{workout.schedule.coach.name.slice(0, 1)}. {workout.schedule.coach.patronymic.slice(0, 1)}. {workout.schedule.coach.surname}</td>
                <td>{workout.schedule.workout_type.title}</td>
                <td>{workout.schedule.gym.title}</td>
                <td><FormCheck onClick={() => onClick(workout.id)} checked={workout.cancelled === 1} disabled={workout.cancelled === 1}/></td>
                <td>{new Date(workout.event).toLocaleDateString()}</td>
                <td className={"text-md-center"}>
                    <NavLink className={"fs-3"} to={`/group-workouts/selected-by-id?id=${workout.id}`}
                             placeholder={"Показать детали..."}>
                        <InfoSquareFill/>
                    </NavLink>
                </td>

            </tr>

        </>
    )
}