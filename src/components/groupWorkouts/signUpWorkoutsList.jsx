import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSignUpWorkouts} from "../../actions/groupWorkouts/action.jsx";
import {Alert} from "react-bootstrap";
import SignUpWorkoutsTableData from "./signUpWorkoutsTableData.jsx";

export default function SignUpWorkoutsList(){
    const dispatch = useDispatch();

    // вызов ф-ии получения списка групповых тренировок от сервера
    useEffect(() => {
        dispatch(getSignUpWorkouts())
    }, [dispatch])

    const workouts = useSelector(state => state.groupWorkouts.signUpWorkouts);

    return (
        <>
        {(workouts.length !== 0) ? <>

            <table className={"table mt-3"}>
                <thead>
                <tr>
                    <th>День недели</th>
                    <th>Время</th>
                    <th>Тренер</th>
                    <th>Тип</th>
                    <th>Зал</th>
                    <th>Дата проведения</th>
                </tr>
                </thead>

                <tbody>
                {workouts.filter((a) => a.event === workouts[0].event).map((item) => (
                    <SignUpWorkoutsTableData key={item.id} workout={item}/>
                ))}
                </tbody>
            </table>

        </> : <Alert variant={"secondary"}>Нет ближайших записей на групповые тренировки</Alert>}
        </>

    );
}