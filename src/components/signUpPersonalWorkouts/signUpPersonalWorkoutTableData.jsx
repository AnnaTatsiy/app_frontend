export default function SignUpPersonalWorkoutTableData({workout}){

    return (
        <>
            <tr>
                <td>{new Date(workout.date_begin).toLocaleDateString()}</td>
                <td>{workout.schedule.time_begin.slice(0, 5)}</td>
                <td>{workout.schedule.coach.passport}</td>
                <td>{workout.schedule.coach.name.slice(0, 1)}. {workout.schedule.coach.patronymic.slice(0, 1)}. {workout.schedule.coach.surname}</td>
                <td>{(workout.customer) ? `${workout.customer.passport}` : "-"}</td>
                <td>{(workout.customer) ? `${workout.customer.name.slice(0, 1)}. ${workout.customer.patronymic.slice(0, 1)}. ${workout.customer.surname}`: "-" }</td>
            </tr>
        </>
    )
}