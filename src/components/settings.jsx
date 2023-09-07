import useAuthContext from "./context/authContext.jsx";
import Image from "./image.jsx";
import Footer from "./footers/footer.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";


export default function Settings() {

    const coach = useSelector(state => state.coaches.authCoach);

    // признак доступна ли продажа абонементов
    const [sale, setSale] = useState(true);

    useEffect(() => {
        setSale((coach) ? coach.sale : true)
    }, [coach])

    const {getImage, user} = useAuthContext();

    const [lo, setLo] = useState(null);
    const [hi, setHi] = useState(null);

    const [error, setError] = useState("");
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");

    const onClick = (e) => {
        e.preventDefault();

        axios.get("http://127.0.0.1:8000/api/coach/change-sale", {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'api/*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setSale(response.data.sale)
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const submitHandler = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append("lo", lo);
        data.append("hi", hi);

        if (data.get('lo') === '' || data.get('hi') === '') {
            data.append("lo", null);
            data.append("hi", null);
        }

        axios.post("http://127.0.0.1:8000/api/coach/edit-limited-price", data, {
            withCredentials: true,
            headers: {
                'Access-Control-Allow-Origin': 'api/*',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    setStatus(response.data.status);
                    setError(response.data.errors);
                    setMessage(response.data.message);

                    setTimeout(() => {
                        setStatus(null);
                        setError("");
                        setMessage("");
                    }, 100000);
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    return (<>
        <div className="container-fluid">
            <div className="row-sm mt-5 p-3 container-fluid-style">
                <div className="p-4 bg-white m-3 border-warning-top border-warning-bottom">
                    <div className="container">
                        <Image getImage={getImage}/>
                        {user.role === 'coach' && <div className={"col-lg-11 ms-5 me-5"}>

                            <form onSubmit={submitHandler} id="form" className={"ms-5 me-5"}>

                                <p className={"fs-5 mt-4 ms-4"}>Изменить стоимость абонемента:</p>

                                <div className="row g-2 ms-3 me-2">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="number" name={"lo"} onChange={(e) => {
                                                setLo(e.target.value)
                                            }} className="form-control" id="floatingInputGrid01"/>
                                            <label htmlFor="floatingInputGrid01">Стоимость 8 посещений</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="number" name={"hi"} onChange={(e) => {
                                                setHi(e.target.value)
                                            }} className="form-control" id="floatingInputGrid02"/>

                                            <label htmlFor="floatingInputGrid02">Стоимость 12 посещений</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 ms-4">
                                    {status === "success" ? (
                                        <div className={"text-success"}>
                                            {message}
                                        </div>
                                    ) : status === "failed" ? (
                                        <div className={"text-danger"}>
                                            {error}
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                <div className={"d-flex justify-content-end mt-3 me-2"}>
                                    <button type="submit" className="btn btn-success">
                                        Отправить
                                    </button>
                                </div>
                            </form>

                            <div className="row g-2 ms-3 me-2 mt-5 ">

                                    <div className="col-md ms-5 mt-5">
                                        <label className="row-1 form-check-label fs-5" htmlFor="flexSwitchCheck">Продажа
                                            абонементов разрешена: </label>
                                    </div>
                                    <div className="col-md mt-5 me-1">
                                        <div className="form-check form-switch ms-4 me-5">
                                            <div className={"d-flex justify-content-end"}>
                                                <input className="row-11 form-check-input fs-3" checked={sale} onClick={onClick} type="checkbox"
                                                       id="flexSwitchCheck"/>
                                            </div>
                                        </div>
                                    </div>

                            </div>

                        </div>}
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>);
}