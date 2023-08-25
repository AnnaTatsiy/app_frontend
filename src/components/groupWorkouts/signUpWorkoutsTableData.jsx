import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {Button, Form, FormControl} from "react-bootstrap";

export default  function SignUpWorkoutsTableData({workout}){
    const dispatch = useDispatch();
    const {handleSubmit, register} = useForm();

    // отправка данных на сервер
    function submitForm(data) {
        //dispatch(addSignUpGroupWorkout(data));
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

                        <Button variant="danger" type="submit">Отменить</Button>
                    </Form>
                </td>
            </tr>
        </>
    )
}