import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getGroupWorkoutsBySchedule} from "../../actions/groupWorkouts/action";
import {useSearchParams} from "react-router-dom";
import {Alert, Table} from "react-bootstrap";
import MyPaginate from "../paginate";
import GroupWorkoutsSimpleTableData from "./groupWorkoutsSimpleTableData";
import Footer from "../footers/footer.jsx";

export default function GroupWorkoutBySchedule() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()

    // текущая страница
    const curr_page = useSelector(state => state.groupWorkouts.selectedPage);
    const [page, setPage] = useState((isNaN(curr_page)) ? 1 : curr_page);

    // вызов ф-ии получения списка групповых тренировок от сервера
    useEffect(() => {
        dispatch(getGroupWorkoutsBySchedule(searchParams.get('id'), page));
    }, [dispatch, page, searchParams])

    //спискок групповых тренировок
    const workouts = useSelector(state => state.groupWorkouts.list)

    //номер последней страницы
    const lastPage = useSelector(state => state.groupWorkouts.lastPage);

    return (
        <>
            <div className="container-fluid">
                <div className="row-sm mt-5 p-3 container-fluid-style">
                    <div className="p-4 bg-white m-3 border-warning-top border-warning-bottom">
                        <div className="container">
                            {workouts.length !== 0 &&
                                <Table>
                                    <thead>
                                    <tr>
                                        <th>День</th>
                                        <th>Время</th>
                                        <th>Тренер</th>
                                        <th>Тип</th>
                                        <th>Зал</th>
                                        <th>Отмена</th>
                                        <th>Дата проведения</th>
                                        <th className={"text-primary"}>Узнать детали...</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {workouts.map((item) => (
                                        <GroupWorkoutsSimpleTableData key={item.id} workout={item}/>
                                    ))}
                                    </tbody>
                                </Table>}

                            {workouts.length === 0 &&
                                <Alert variant={"secondary"} className={"not-fount"}><p className={"fs-5"}>
                                    По вашему запросу ничего не найдено!
                                </p>
                                </Alert>
                            }

                            {workouts.length !== 0 &&
                                <MyPaginate
                                    page={page}
                                    lastPage={lastPage}
                                    setPage={setPage}
                                />}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}