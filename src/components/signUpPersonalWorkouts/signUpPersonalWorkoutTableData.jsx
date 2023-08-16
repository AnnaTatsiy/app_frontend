export default function SignUpPersonalWorkoutTableData({workout}){

    return (
        <>
            <tr>
                <td>{new Date(workout.date_begin).toLocaleDateString()}</td>
                <td>{workout.time_begin.slice(0, 5)}</td>
                <td>{workout.coach.passport}</td>
                <td>{workout.coach.name.slice(0, 1)}. {workout.coach.patronymic.slice(0, 1)}. {workout.coach.surname}</td>
                <td>{workout.customer.passport}</td>
                <td>{workout.customer.name.slice(0, 1)}. {workout.customer.patronymic.slice(0, 1)}. {workout.customer.surname}</td>
            </tr>
        </>
    )
}