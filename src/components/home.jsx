import useAuthContext from "./context/authContext.jsx";
import Footer from "./footers/footer.jsx";
import UnlimitedSubscriptionAbout from "./unlimitedSubscriptions/unlimitedSubscriptionAbout.jsx";
import LimitedSubscriptionAbout from "./limitedSubscriptions/limitedSubscriptionAbout.jsx";
import SignUpWorkoutsTableData from "./groupWorkouts/signUpWorkoutsTableData.jsx";
import SignUpWorkoutsList from "./groupWorkouts/signUpWorkoutsList.jsx";

export default function Home() {
    const {user} = useAuthContext();

    return (<>
        <div className="container-fluid">
            <div className="row-sm mt-5 p-3 container-fluid-style">
                <div className="p-4 bg-white m-3 border-warning-top border-warning-bottom">
                    <div className="container">
                        {(user.role === 'customer') ? <>
                            <p className={"mt-3 fs-4"}>Ближайшие запланированные групповые тренировки:</p>
                            <SignUpWorkoutsList/>

                            <div className="row align-items-md-stretch mt-4">
                                <div className="col-md-6">
                                    <div className="h-100 rounded-3">
                                        <UnlimitedSubscriptionAbout/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="h-100 rounded-3">
                                        <LimitedSubscriptionAbout/>
                                    </div>
                                </div>
                            </div>

                        </> : "Вы авторизировались как Администратор"}
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>);
}