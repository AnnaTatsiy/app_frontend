import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import CustomerTableData from "./customerTableData";
import {getAllCustomers, getCustomers} from "../../actions/customers/action";
import {Button, Col, Table} from "react-bootstrap";
import CustomerFormModal from "./customerFormModal.jsx";
import CustomerOption from "./customerOption";
import MyPaginate from "../paginate";

export default function CustomersList() {
    const dispatch = useDispatch();

    // текущая страница
    const [page, setPage] = useState(1);

    // вызов ф-ии получения списка клиентов от сервера
    useEffect(() => {
        dispatch(getCustomers(page));
    }, [dispatch, page])

    //все клиенты для dataList
    const dataList = useSelector(state => state.customers.dataList);

    useEffect(() => {
        dispatch(getAllCustomers())
    }, [dispatch])

    //клиенты
    const customers = useSelector(state => state.customers.list)

    //номер последней страницы
    const lastPage = useSelector(state => state.customers.lastPage);

    // состояние отображение модального окна
    let [formModalShow, setFormModalShow] = useState(false);

    // состояние режима добавления/редактирования
    const [isAddForm, setIsAddForm] = useState(false);

    //климент которого будем редактировать
    let customer = useRef(null);

    // состояние для фильтрации клиентов
    const [searchValue, setSearchValue] = useState('');

    const onClickForFormEdit = (id) => {

        setFormModalShow(true);
        setIsAddForm(false);
        customer.current = viewCustomers.filter((item) => item.id === id)[0];
    }

    //обработчик клика по элементам пагинации
    const handlePageClick = (e) =>{
        setPage(e.selected+1);
        setSearchValue('');
    }

    // найти клиента по паспорту
    const filteredCustomers = dataList.filter(customer =>
        customer.passport.includes(searchValue)
    );

    //проверка отобразить всех или по критерию поиска
    const viewCustomers = (searchValue.length !== 0) ? filteredCustomers : customers;

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
                                <CustomerOption key={item.id} customer={item}/>
                            ))}
                        </datalist>
                        <label htmlFor="exampleDataList" className="form-label p-3 ps-4 text-secondary">ФИО или серия-номер
                            паспорта клиента:</label>
                    </div>
                </div>

                <div className={"d-flex justify-content-end"}>
                    <Button variant={"success"} className={"col-2"} onClick={() => {
                        setFormModalShow(true);
                        setIsAddForm(true);
                        customer.current = null;
                    }}>Добавить клиента</Button>

                </div>

            </Col>

            <Table>
                <thead>
                <tr>
                    <th>Паспорт</th>
                    <th>ФИО клиента</th>
                    <th>Номер телефона</th>
                    <th>Эл. почта</th>
                    <th>Место проживания</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {viewCustomers.map((item) => (
                    <CustomerTableData key={item.id} customer={item} onClick={onClickForFormEdit}/>
                ))}
                </tbody>
            </Table>

            <MyPaginate
                page={page}
                lastPage={lastPage}
                setPage={setPage}
            />

            <CustomerFormModal
                show={formModalShow}
                add={isAddForm ? 'true' : null}
                customer={customer.current}
                onHide={() => setFormModalShow(false)}
            />
        </>
    )

}

