import {Button, Form, FormCheck, FormControl, Row} from "react-bootstrap";
import {useForm} from "react-hook-form";

export default function AvailableWorkoutsTableData({workout}) {

    const {handleSubmit, register} = useForm();

    // отправка данных на сервер
    function submitForm(data) {
        //dispatch(addCoach(data));
    }

    return (
        <>
            <tr>
                <td>{workout.schedule.day.title}</td>
                <td>{workout.schedule.time_begin.slice(0, 5)}</td>
                <td>{workout.schedule.coach.name.slice(0, 1)}. {workout.schedule.coach.patronymic.slice(0, 1)}. {workout.schedule.coach.surname}</td>
                <td>{workout.schedule.workout_type.title}</td>
                <td>{workout.schedule.gym.title}</td>
                <td>{new Date(workout.event).toLocaleDateString()}</td>
                <td className={"text-md-center"}>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <FormControl
                            {...register('id')}
                            type="number"
                            value={workout.id}
                            readOnly={true}
                            hidden={true}/>

                        <Button variant="success" type="submit">Записаться</Button>
                    </Form>
                </td>
            </tr>
        </>
    )
}