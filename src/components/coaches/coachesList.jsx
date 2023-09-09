import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import CoachItem from "./coachItem";
import {getAllCoaches, getCoaches} from "../../actions/coaches/action";
import {Button, Col, Table} from "react-bootstrap";
import CoachFormModal from "./coachFormModal.jsx";
import CoachOption from "./coachOption";
import 'react-toastify/dist/ReactToastify.css';
import MyPaginate from "../paginate";

export default function CoachesList() {
    const dispatch = useDispatch();

    // текущая страница
    const [page, setPage] = useState(1);

    // вызов ф-ии получения списка тренеров от сервера
    useEffect(() => {
        dispatch(getCoaches(page));
    }, [dispatch, page])

    //все тренеры для dataList
    const dataList = useSelector(state => state.coaches.dataList);

    useEffect(() => {
        dispatch(getAllCoaches())
    }, [dispatch])

    //тренеры
    const coaches = useSelector(state => state.coaches.list)

    //номер последней страницы
    const lastPage = useSelector(state => state.coaches.lastPage);

    // состояние отображение модального окна
    let [formModalShow, setFormModalShow] = useState(false);

    // состояние режима добавления/редактирования
    const [isAddForm, setIsAddForm] = useState(false);

    //тренер которого будем редактировать
    let coach = useRef(null);

    // состояние для фильтрации тренеров
    const [searchValue, setSearchValue] = useState('');

    const onClickForFormEdit = (id) => {
        setFormModalShow(true);
        setIsAddForm(false);
        coach.current = viewCoaches.filter((item) => item.id === id)[0];
    }

    //обработчик клика по элементам пагинации
    const handlePageClick = (e) => {
        setPage(e.selected + 1);
        setSearchValue('');
    }

    // список отфильтрованных тренеров по серии-номеру паспорта
    const filteredCoaches = dataList.filter(coach =>
        coach.passport.includes(searchValue)
    );

    //проверка отобразить всех или по критерию поиска
    const viewCoaches = (searchValue.length !== 0) ? filteredCoaches : coaches;

    return (
        <>
            <Col>

                <div className={"row mt-4"}>
                    <div className="form-floating col-5">
                        <input
                            className="form-control"
                            type={"text"} value={searchValue}
                            list="datalistOptions" id="exampleDataList"
                            placeholder="Type to search..."
                            onChange={(e) => {
                                setSearchValue(e.target.value);
                            }}
                            name={"passport"}/>
                        <datalist id="datalistOptions">
                            {dataList.map((item) => (
                                <CoachOption key={item.id} coach={item}/>
                            ))}
                        </datalist>
                        <label htmlFor="exampleDataList" className="form-label p-3 ps-4 text-secondary">ФИО или серия-номер
                            паспорта:</label>
                    </div>
                </div>

                <div className={"d-flex justify-content-end"}>
                    <Button variant={"success"} onClick={() => {
                        setFormModalShow(true);
                        setIsAddForm(true);
                        coach.current = null;
                    }}>Добавить тренера</Button>
                </div>

            </Col>

            <Table>
                <thead>
                <tr>
                    <th>Паспорт</th>
                    <th>ФИО тренера</th>
                    <th>Номер телефона</th>
                    <th>Эл. почта</th>
                    <th>Место проживания</th>
                    <th>Редактировать</th>
                    <th>Показать тренировки</th>
                </tr>
                </thead>
                <tbody>
                {viewCoaches.map((item) => (
                    <CoachItem key={item.id} coach={item} onClick={onClickForFormEdit}/>
                ))}
                </tbody>
            </Table>

            <MyPaginate
                page={page}
                lastPage={lastPage}
                setPage={setPage}
            />

            <CoachFormModal
                show={formModalShow}
                add={isAddForm ? 'true' : null}
                coach={coach.current}
                onHide={() => setFormModalShow(false)}
            />
        </>
    )

}
