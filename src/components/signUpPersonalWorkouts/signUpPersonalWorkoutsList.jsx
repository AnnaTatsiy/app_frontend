import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {filteringPersonalWorkouts, getSignUpPersonalWorkouts} from "../../actions/signUpPersonalWorkouts/action";
import {Alert, Button, Table} from "react-bootstrap";
import SignUpPersonalWorkoutTableData from "./signUpPersonalWorkoutTableData";
import SignUpPersonalWorkoutsFilter from "./signUpPersonalWorkoutsFilter";
import MyPaginate from "../paginate";

export default function SignUpPersonalWorkoutsList(){

    const dispatch = useDispatch();

    // текущая страница
    const curr_page = useSelector(state => state.signUpPersonalWorkouts.selectedPage);
    const [page, setPage] = useState((isNaN(curr_page)) ? 1 : curr_page);
    
    // данные отфильрованные или нет
    const isFiltered =  useSelector(state => state.signUpPersonalWorkouts.isFiltered);

    useEffect(() => {
        setPage(1);
    }, [isFiltered]);
    
    // вызов ф-ии получения списка тренировок от сервера
    useEffect(() => {
        const params = ({...(JSON.parse(localStorage.getItem('personalWorkoutsFilter'))), page: page});
        (isFiltered) ? dispatch(filteringPersonalWorkouts(params)): dispatch(getSignUpPersonalWorkouts(page))
    }, [dispatch, isFiltered, page])

    let [filterModalShow, setFilterModalShow] = useState(false);
    
    //спискок тренировок
    const workouts = useSelector(state => state.signUpPersonalWorkouts.list);
    // .sort((a,b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin))
    const sorted = (workouts !== undefined) ? [...workouts]
        .sort(function (a,b){
            if(b.date_begin === a.date_begin){
                return b.schedule.time_begin.localeCompare(a.schedule.time_begin);
            }
            return b.date_begin - a.date_begin
        } ) : undefined
    //номер последней страницы
    const lastPage = useSelector(state => state.signUpPersonalWorkouts.lastPage);

    return (
        <>
            <div className={"d-flex justify-content-end mt-2 mb-4"}>
                <Button variant={"secondary"} className={"me-2"} onClick={() => dispatch(getSignUpPersonalWorkouts(page))}>Сброс</Button>
                <Button variant={"primary"}  onClick={() => setFilterModalShow(true)}>Открыть фильтр</Button>
            </div>

            {sorted !== undefined &&
                <Table>
                    <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Время</th>
                        <th>Серия-номер тренера</th>
                        <th>Тренер</th>
                        <th>Серия-номер клиента</th>
                        <th>Клиент</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sorted.map((item) => (
                        <SignUpPersonalWorkoutTableData key={item.id} workout={item}/>
                    ))}
                    </tbody>
                </Table>}

            {sorted === undefined &&
                <Alert variant={"secondary"} className={"not-fount"}><p>
                    По вашему запросу ничего не найдено!
                </p>
                </Alert>
            }

            <MyPaginate
                page={page}
                lastPage={lastPage}
                setPage={setPage}
            />

            <SignUpPersonalWorkoutsFilter
                show={filterModalShow}
                onHide={() => setFilterModalShow(false)}
            />
        </>
    );
}