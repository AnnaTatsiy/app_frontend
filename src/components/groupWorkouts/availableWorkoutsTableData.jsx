import {Button, Form, FormControl} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addSignUpGroupWorkout} from "../../actions/signUpGroupWorkouts/action.jsx";
import {useState} from "react";

export default function AvailableWorkoutsTableData({workout}) {
    const dispatch = useDispatch();
    const {handleSubmit, register} = useForm();
    const [disable, setDisable] = useState(false);

    // отправка данных на сервер
    function submitForm(data) {
        dispatch(addSignUpGroupWorkout(data));
        setDisable(true);
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
                            hidden={true}
                            />

                        <Button disabled={disable} variant="success" type="submit">Записаться</Button>
                    </Form>
                </td>
            </tr>
        </>
    )
}