import {Alert, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getGroupWorkoutById} from "../../actions/groupWorkouts/action";
import {useSearchParams} from "react-router-dom";
import SignUpGroupWorkoutsList from "../signUpGroupWorkouts/signUpGroupWorkoutsList";
import Footer from "../footers/footer.jsx";

export default function GroupWorkoutDetails() {
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGroupWorkoutById(searchParams.get('id')))
    }, [dispatch, searchParams])

    const [show, setShow] = useState(true);
    const workout = useSelector(state => state.groupWorkouts.selectedWorkout);

    return (workout !== null) ?
        (
            <>
                <div className="container-fluid">
                    <div className="row-sm mt-5 p-3 container-fluid-style">
                        <div className="p-4 bg-white m-3 border-warning-top border-warning-bottom">
                            <div className="container">
                                <Alert show={show} variant="info">
                                    <Alert.Heading>Информация от тренировке:</Alert.Heading>
                                    <p>
                                        <ul>
                                            <li>День недели: <b>{workout.schedule.day.title}</b></li>
                                            <li>Время
                                                проведения: <b>{workout.schedule.time_begin.slice(0, 5)} - {workout.schedule.time_end.slice(0, 5)}</b>
                                            </li>
                                            <li>Тренер: <b>{workout.schedule.coach.name.slice(0, 1)}. {workout.schedule.coach.patronymic.slice(0, 1)}. {workout.schedule.coach.surname}</b>
                                            </li>
                                            <li>Тип тренировки: <b>{workout.schedule.workout_type.title}</b></li>
                                            <li>Место проведения: <b>{workout.schedule.gym.title}</b></li>
                                            <li>Дата проведения: <b>{new Date(workout.event).toLocaleDateString()}</b>
                                            </li>
                                        </ul>
                                    </p>
                                    <hr/>
                                    <div className="d-flex justify-content-end">
                                        <Button onClick={() => setShow(false)} variant="outline-success">
                                            Понятно!
                                        </Button>
                                    </div>
                                </Alert>

                                <div className={"d-flex justify-content-end mt-2 mb-3 "}>
                                    {!show && <Button variant={"primary"} onClick={() => setShow(true)}>Показать
                                        детали...</Button>}
                                </div>

                                <Alert variant={(workout.cancelled === 0) ? "success" : "danger"}>
                                    <Alert.Heading>{(workout.cancelled === 0) ? "Запись на тренировку активна!" : "Ошибка!"}</Alert.Heading>
                                    <p>
                                        {(workout.cancelled === 0) ?
                                            "Статус тренировки активный! Она будет проведена и сейчас на нее активна запись."
                                            : `Тренеровка отменена! Причина: ${workout.reason} Запись недоступна.`}
                                    </p>
                                </Alert>

                                <SignUpGroupWorkoutsList id={searchParams.get('id')}/></div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </>

        ) : (<>Загрузка...</>);
}




