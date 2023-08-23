import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAvailableWorkouts} from "../../actions/groupWorkouts/action.jsx";
import Footer from "../footers/footer.jsx";
import AvailableWorkoutsTabs from "./availableWorkoutsTabs.jsx";
import {Alert} from "react-bootstrap";

export default function AvailableWorkoutsList() {

    const dispatch = useDispatch();

    // вызов ф-ии получения списка групповых тренировок от сервера
    useEffect(() => {
        dispatch(getAvailableWorkouts())
    }, [dispatch])

    //спискок групповых тренировок
    const workouts = useSelector(state => state.groupWorkouts.availableWorkouts);

    console.log(!workouts.message);

    if(!workouts.message) {
        // сортирую тренировки по дням недели
        const worksOnMonday = workouts.filter(w => w.schedule.day.id === 1).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.event) - new Date(b.event));
        const worksOnTuesday = workouts.filter(w => w.schedule.day.id === 2).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.event) - new Date(b.event));
        const worksOnWednesday = workouts.filter(w => w.schedule.day.id === 3).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.event) - new Date(b.event));
        const worksOnThursday = workouts.filter(w => w.schedule.day.id === 4).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.event) - new Date(b.event));
        const worksOnFriday = workouts.filter(w => w.schedule.day.id === 5).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.event) - new Date(b.event));
        const worksOnSaturday = workouts.filter(w => w.schedule.day.id === 6).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.event) - new Date(b.event));
        const worksOnSunday = workouts.filter(w => w.schedule.day.id === 7).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.event) - new Date(b.event));
    }

    return (

        <>
            <div className="container-fluid">
                <div className="row-sm mt-5 p-3 container-fluid-style">
                    <div className="p-4 bg-white m-3 border-warning-top border-warning-bottom">
                        <div className="container">
                            {!workouts.message ? <>
                                {!worksOnMonday ? <>
                                    Загрузка...

                                </> : <> <ul className="nav nav-pills mb-3" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="monday-tab" data-bs-toggle="pill"
                                                data-bs-target="#monday"
                                                type="button" role="tab" aria-controls="monday" aria-selected="true">ПН
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="tuesday-tab" data-bs-toggle="pill"
                                                data-bs-target="#tuesday"
                                                type="button" role="tab" aria-controls="tuesday" aria-selected="false">ВТ
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="wednesday-tab" data-bs-toggle="pill"
                                                data-bs-target="#wednesday"
                                                type="button" role="tab" aria-controls="wednesday" aria-selected="false">СР
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="thursday-tab" data-bs-toggle="pill"
                                                data-bs-target="#thursday"
                                                type="button" role="tab" aria-controls="thursday" aria-selected="false">ЧТ
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="friday-tab" data-bs-toggle="pill"
                                                data-bs-target="#friday"
                                                type="button" role="tab" aria-controls="friday" aria-selected="false">ПТ
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="saturday-tab" data-bs-toggle="pill"
                                                data-bs-target="#saturday"
                                                type="button" role="tab" aria-controls="saturday" aria-selected="false">СБ
                                        </button>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="sunday-tab" data-bs-toggle="pill"
                                                data-bs-target="#sunday"
                                                type="button" role="tab" aria-controls="sunday" aria-selected="false">ВС
                                        </button>
                                    </li>

                                </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="monday" role="tabpanel"
                                             aria-labelledby="monday-tab">
                                            <AvailableWorkoutsTabs workouts={worksOnMonday}/>
                                        </div>
                                        <div className="tab-pane fade" id="tuesday" role="tabpanel"
                                             aria-labelledby="tuesday-tab">
                                            <AvailableWorkoutsTabs workouts={worksOnTuesday}/>
                                        </div>
                                        <div className="tab-pane fade" id="wednesday" role="tabpanel"
                                             aria-labelledby="wednesday-tab">
                                            <AvailableWorkoutsTabs workouts={worksOnWednesday}/>
                                        </div>

                                        <div className="tab-pane fade" id="thursday" role="tabpanel"
                                             aria-labelledby="thursday-tab">
                                            <AvailableWorkoutsTabs workouts={worksOnThursday}/>
                                        </div>

                                        <div className="tab-pane fade" id="friday" role="tabpanel" aria-labelledby="friday-tab">
                                            <AvailableWorkoutsTabs workouts={worksOnFriday}/>
                                        </div>

                                        <div className="tab-pane fade" id="saturday" role="tabpanel"
                                             aria-labelledby="saturday-tab">
                                            <AvailableWorkoutsTabs workouts={worksOnSaturday}/>
                                        </div>

                                        <div className="tab-pane fade" id="sunday" role="tabpanel" aria-labelledby="sunday-tab">
                                            <AvailableWorkoutsTabs workouts={worksOnSunday}/>
                                        </div>

                                    </div></>}
                               </> : <>
                                <Alert variant={"danger"}>
                                    <p>
                                        <b>Ошибка: </b>{workouts.message}
                                    </p>
                                </Alert>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}