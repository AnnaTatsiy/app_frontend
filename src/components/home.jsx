import useAuthContext from "./context/authContext.jsx";
import Footer from "./footers/footer.jsx";
import UnlimitedSubscriptionAbout from "./unlimitedSubscriptions/unlimitedSubscriptionAbout.jsx";
import LimitedSubscriptionAbout from "./limitedSubscriptions/limitedSubscriptionAbout.jsx";

export default function Home() {
    const {user} = useAuthContext();

    //console.log(user)
    return (<>
        <div className="container-fluid">
            <div className="row-sm mt-5 p-3 container-fluid-style">
                <div className="p-4 bg-white m-3 border-warning-top border-warning-bottom">
                    <div className="container">
                        {(user.role === 'customer') ? <>
                            <div className="row align-items-md-stretch">
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
                        </> : ""}
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>);
}