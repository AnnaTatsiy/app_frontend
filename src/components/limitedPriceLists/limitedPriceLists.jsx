import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getAllLimitedPriceLists, getLimitedPriceLists} from "../../actions/limitedPriceLists/action";
import {getAllCoaches} from "../../actions/coaches/action";
import {Table} from "react-bootstrap";
import CoachOption from "../coaches/coachOption";
import LimitedPriceListTableData from "./limitedPriceListTableData";
import MyPaginate from "../paginate";

export default function LimitedPriceLists(){

    const dispatch = useDispatch();

    // текущая страница
    const [page, setPage] = useState(1);

    //все тренеры для dataList
    const dataList = useSelector(state => state.coaches.dataList);

    // вызов ф-ии получения прайс листа от сервера
    useEffect(() => {
        dispatch(getLimitedPriceLists(page));
    }, [dispatch, page])

    useEffect(() => {
        dispatch(getAllCoaches())
    }, [dispatch])

    useEffect(() => {
        dispatch(getAllLimitedPriceLists())
    }, [dispatch])

    const prices = useSelector(state => state.limitedPriceLists.list);
    const fullPriceLists = useSelector(state => state.limitedPriceLists.fullList);

    //номер последней страницы
    const lastPage = useSelector(state => state.limitedPriceLists.lastPage);

    // состояние для фильтрации
    const [searchValue, setSearchValue] = useState('');

    //обработчик клика по элементам пагинации
    const handlePageClick = (e) => {
        setPage(e.selected + 1);
        setSearchValue('');
    }

    // список отфильтрованных прайс листов по серии-номеру паспорта тренера
    const filteredPrices = fullPriceLists.filter(price =>
        price.coach.passport.includes(searchValue)
    );

    //проверка отобразить всех или по критерию поиска
    const viewPrices = ((searchValue.length !== 0) ? filteredPrices : prices);

    return (
        <>
                <div className={"row mt-4 mb-3"}>
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

            {(viewPrices.length !== 0) ? <>
            <Table>
                <thead>
                <tr>
                    <th>ФИО тренера</th>
                    <th>Кол-во тренировок</th>
                    <th>Стоимость</th>
                </tr>
                </thead>
                <tbody>
                {viewPrices.map((item) => (
                    <LimitedPriceListTableData key={item.id} price={item}/>
                ))}
                </tbody>
            </Table>

            <MyPaginate
                page={page}
                lastPage={lastPage}
                setPage={setPage}
            /> </> : <p className={"text-dark"}>По вашему запросу ничего не найдено</p>  }
        </>
    )
}