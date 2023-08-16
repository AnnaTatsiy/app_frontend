import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getSchedule} from "../../actions/schedules/action";
import ScheduleItem from "./scheduleItem";
import Footer from "../footers/footer.jsx";

export default function Schedule() {
    const dispatch = useDispatch();

    // вызов ф-ии получения расписания от сервера
    useEffect(() => {
        dispatch(getSchedule());
    }, [dispatch])

    // расписание
    const schedule = useSelector(state => state.schedules.list);

    // сортирую тренировки по дням недели
    const workOnMonday = schedule.filter(node => node.day.id === 1).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnTuesday = schedule.filter(node => node.day.id === 2).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnWednesday = schedule.filter(node => node.day.id === 3).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnThursday = schedule.filter(node => node.day.id === 4).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnFriday = schedule.filter(node => node.day.id === 5).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnSaturday = schedule.filter(node => node.day.id === 6).sort((a, b) => a.time_begin.localeCompare(b.time_begin));
    const workOnSunday = schedule.filter(node => node.day.id === 7).sort((a, b) => a.time_begin.localeCompare(b.time_begin));

    return (
        <>
            <div className="container-fluid">
                <div className="row-sm mt-5 p-3 container-fluid-style">
                    <div className="p-4 bg-white m-3 border-warning-top border-warning-bottom">
                        <div className="container">
                            <ul className="nav nav-pills mb-3" id="myTab" role="tablist">
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
                                    <table className={"table mt-3"}>
                                        <thead>
                                        <tr>
                                            <th>Время занятий</th>
                                            <th>Тип тренировки</th>
                                            <th>Тренер</th>
                                            <th>№ Зала</th>
                                            <th className={"text-primary text-md-center"}>Показать тренировки...</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {workOnMonday.map((item) => (
                                            <ScheduleItem key={item.id} schedule={item}/>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="tab-pane fade" id="tuesday" role="tabpanel"
                                     aria-labelledby="tuesday-tab">
                                    <table className={"table mt-3"}>
                                        <thead>
                                        <tr>
                                            <th>Время занятий</th>
                                            <th>Тип тренировки</th>
                                            <th>Тренер</th>
                                            <th>№ Зала</th>
                                            <th className={"text-primary text-md-center"}>Показать тренировки...</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {workOnTuesday.map((item) => (
                                            <ScheduleItem key={item.id} schedule={item}/>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="tab-pane fade" id="wednesday" role="tabpanel"
                                     aria-labelledby="wednesday-tab">
                                    <table className={"table mt-3"}>
                                        <thead>
                                        <tr>
                                            <th>Время занятий</th>
                                            <th>Тип тренировки</th>
                                            <th>Тренер</th>
                                            <th>№ Зала</th>
                                            <th className={"text-primary text-md-center"}>Показать тренировки...</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {workOnWednesday.map((item) => (
                                            <ScheduleItem key={item.id} schedule={item}/>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="tab-pane fade" id="thursday" role="tabpanel"
                                     aria-labelledby="thursday-tab">
                                    <table className={"table mt-3"}>
                                        <thead>
                                        <tr>
                                            <th>Время занятий</th>
                                            <th>Тип тренировки</th>
                                            <th>Тренер</th>
                                            <th>№ Зала</th>
                                            <th className={"text-primary text-md-center"}>Показать тренировки...</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {workOnThursday.map((item) => (
                                            <ScheduleItem key={item.id} schedule={item}/>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="tab-pane fade" id="friday" role="tabpanel" aria-labelledby="friday-tab">
                                    <table className={"table mt-3"}>
                                        <thead>
                                        <tr>
                                            <th>Время занятий</th>
                                            <th>Тип тренировки</th>
                                            <th>Тренер</th>
                                            <th>№ Зала</th>
                                            <th className={"text-primary text-md-center"}>Показать тренировки...</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {workOnFriday.map((item) => (
                                            <ScheduleItem key={item.id} schedule={item}/>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="tab-pane fade" id="saturday" role="tabpanel"
                                     aria-labelledby="saturday-tab">
                                    <table className={"table mt-3"}>
                                        <thead>
                                        <tr>
                                            <th>Время занятий</th>
                                            <th>Тип тренировки</th>
                                            <th>Тренер</th>
                                            <th>№ Зала</th>
                                            <th className={"text-primary text-md-center"}>Показать тренировки...</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {workOnSaturday.map((item) => (
                                            <ScheduleItem key={item.id} schedule={item}/>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="tab-pane fade" id="sunday" role="tabpanel" aria-labelledby="sunday-tab">
                                    <table className={"table mt-3"}>
                                        <thead>
                                        <tr>
                                            <th>Время занятий</th>
                                            <th>Тип тренировки</th>
                                            <th>Тренер</th>
                                            <th>№ Зала</th>
                                            <th className={"text-primary text-md-center"}>Показать тренировки...</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {workOnSunday.map((item) => (
                                            <ScheduleItem key={item.id} schedule={item}/>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>

        </>
    )
}

