import {useDispatch, useSelector} from "react-redux";
import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSignUpPersonalWorkoutsByCoach} from "../../actions/signUpPersonalWorkouts/action.jsx";
import Footer from "../footers/footer.jsx";
import SignUpPersonalWorkoutsByCoachTab from "./signUpPersonalWorkoutsByCoachTab.jsx";
import ReactPaginate from "react-paginate";

export default function SignUpPersonalWorkoutsByCoach(){
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()

    // текущая страница
    const [page, setPage] = useState(2);

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

    return (
        <>
            <div className="container-fluid">
                <div className="row-sm mt-5 p-3 container-fluid-style">
                    <div className="p-4 bg-white m-3 border-warning-top border-warning-bottom">
                        <div className="container">

                            {(workouts instanceof Array) ?
                                <div className={"min-height-container"}>
                                    { (worksOnSunday.length !== 0) ? <>

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

                                    </> : <p className={"text-dark m-3 mt-4"}>У тренера не было тренеровок на этой недели</p>}


                                    <div className={"custom-paginate"}>
                                        <ReactPaginate
                                            initialPage = {page - 1}
                                            forcePage = {page - 1}
                                            previousLabel={'«'}
                                            breakLabel={'...'}
                                            nextLabel={'»'}
                                            pageCount={3}
                                            marginPagesDisplayed={5}
                                            pageRangeDisplayed={8}
                                            onPageChange={(e) => (setPage(e.selected+1))}
                                            containerClassName={'pagination'}
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            previousClassName={'page-item'}
                                            previousLinkClassName={'page-link'}
                                            nextClassName={'page-item'}
                                            nextLinkClassName={'page-link'}
                                            breakClassName={'page-item'}
                                            breakLinkClassName={'page-link'}
                                            activeClassName={'active'}
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