import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSignUpPersonalWorkoutsByCoach
} from "../../actions/signUpPersonalWorkouts/action.jsx";
import Footer from "../footers/footer.jsx";
import SignUpPersonalWorkoutsByCoachTab from "./signUpPersonalWorkoutsByCoachTab.jsx";
import ReactPaginate from "react-paginate";
import axios from "axios";
import {ProgressBar} from "react-bootstrap";

export default function SignUpPersonalWorkoutsByCoach(){
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()

    // текущая страница
    const [page, setPage] = useState(2);

    //заполненность расписания
    const [fullness, setFullness] = useState({
        fact: 1,
        required: 1,
        recommend: 1
    });

    const [variant, setVariant] = useState("secondary");
    const [progress, setProgress] = useState(100);

    const [variantText, setVariantText] = useState("");
    const [variantTextColor, setVariantTextColor] = useState("text-secondary");

    //сколько людей записаны на текущей недели
    const [count, setCount] = useState(0);
    
    //спискок тренировок
    const workouts = useSelector(state => state.signUpPersonalWorkouts.list);

    let worksOnMonday = [];
    let worksOnTuesday = [];
    let worksOnWednesday = [];
    let worksOnThursday = [];
    let worksOnFriday = [];
    let worksOnSaturday = [];
    let worksOnSunday = [];

    useEffect(() => {
        dispatch(getSignUpPersonalWorkoutsByCoach(searchParams.get('id'), page));
    }, [dispatch, page, searchParams])

    useEffect(() => {
        if(workouts.length !== 0) {
            setCount(workouts.filter(w => w.customer_id !== null).length)
        }
    }, [page, searchParams, workouts])

    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/coaches/required-amount-workouts/${searchParams.get('id')}`, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'api/*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setFullness(response.data)
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }, [fullness, searchParams])

    useEffect(() => {
        setVariant((fullness.fact < fullness.required) ? "danger" : ((fullness.fact < fullness.recommend) ? "warning" : "primary" ))

        const value = (fullness.fact * 100)/fullness.recommend;
        setProgress((value < 100) ? value : 100)
        setVariantTextColor("text-"+variant)
        setVariantText(getVariant());
    }, [fullness, variant]);

    const getVariant = () => {
        return (fullness.fact < fullness.required) ? `Расписание не заполнено, требуется еще ${fullness.recommend - fullness.fact} тренеров(ка)ок!` : ((fullness.fact < fullness.recommend)
            ? `Расписание недостаточно заполнено, требуется еще ${fullness.recommend - fullness.fact} тренеров(ка)ок!` : "Расписание заполнено" );
    }
    
    // сортирую тренировки по дням недели
    if(workouts.length !== 0) {
        worksOnMonday = workouts.filter(w => w.schedule.day_id === 1).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin));
        worksOnTuesday = workouts.filter(w => w.schedule.day_id === 2).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin));
        worksOnWednesday = workouts.filter(w => w.schedule.day_id === 3).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin));
        worksOnThursday = workouts.filter(w => w.schedule.day_id === 4).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin));
        worksOnFriday = workouts.filter(w => w.schedule.day_id === 5).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin));
        worksOnSaturday = workouts.filter(w => w.schedule.day_id === 6).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin));
        worksOnSunday = workouts.filter(w => w.schedule.day_id === 7).sort((a, b) => a.schedule.time_begin.localeCompare(b.schedule.time_begin)).sort((a, b) => new Date(a.date_begin) - new Date(b.date_begin));
    }

    const  labelBuilder = (page) => {
        switch (page){
            case 1:
                return "Прошедшая"
            case 2:
                return "Текущая неделя"
            case 3:
                return "Следующая"
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row-sm mt-5 p-3 container-fluid-style">
                    <div className="p-4 bg-white m-3 border-warning-top border-warning-bottom">
                        <div className="container">

                            {(workouts instanceof Array) ?
                                <div className={"min-height-container"}>
                                    { (worksOnSunday.length !== 0) ? <>

                                        <p className={"text-success"}>Количество занятых записей: {count}</p>
                                        <p className={"text-primary"}>Количество свободных записей: {workouts.length - count}</p>

                                        <div className="row">
                                            <div className="col-6">
                                                <ProgressBar variant={variant} className={"mt-3 mb-2"} animated now={progress} />
                                            </div>
                                            <div className="col mt-2">
                                                <p className={variantTextColor}>{variantText}</p>
                                            </div>
                                        </div>


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
                                                <SignUpPersonalWorkoutsByCoachTab workouts={worksOnMonday}/>
                                            </div>
                                            <div className="tab-pane fade" id="tuesday" role="tabpanel"
                                                 aria-labelledby="tuesday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={worksOnTuesday}/>
                                            </div>
                                            <div className="tab-pane fade" id="wednesday" role="tabpanel"
                                                 aria-labelledby="wednesday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={worksOnWednesday}/>
                                            </div>

                                            <div className="tab-pane fade" id="thursday" role="tabpanel"
                                                 aria-labelledby="thursday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={worksOnThursday}/>
                                            </div>

                                            <div className="tab-pane fade" id="friday" role="tabpanel" aria-labelledby="friday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={worksOnFriday}/>
                                            </div>

                                            <div className="tab-pane fade" id="saturday" role="tabpanel"
                                                 aria-labelledby="saturday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={worksOnSaturday}/>
                                            </div>

                                            <div className="tab-pane fade" id="sunday" role="tabpanel" aria-labelledby="sunday-tab">
                                                <SignUpPersonalWorkoutsByCoachTab workouts={worksOnSunday}/>
                                            </div>

                                        </div>

                                    </> : <p className={"text-dark m-3 mt-4"}>У тренера нет тренеровок на этой недели</p>}


                                    <div className={"custom-paginate"}>
                                        <ReactPaginate
                                            initialPage = {page - 1}
                                            forcePage = {page - 1}
                                            previousLabel={''}
                                            nextLabel={''}
                                            pageCount={3}
                                            marginPagesDisplayed={5}
                                            pageRangeDisplayed={8}
                                            onPageChange={(e) => (setPage(e.selected+1))}
                                            containerClassName={'pagination'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            activeClassName={'active'}
                                            pageLabelBuilder = {labelBuilder}
                                        />
                                    </div>

                                </div> : <>Загрузка...</>}

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}