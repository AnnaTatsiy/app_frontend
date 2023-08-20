import logo from "../../assets/images/favicon.ico";
import {NavLink, Outlet} from "react-router-dom";

export default function AdminLayouts({user, logout}) {

    const setActive = ({isActive}) => "nav-link " + (isActive ? "active" : "");

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark rounded navbar-dark sticky-top">
                <div className="container-fluid">
                    <div className={"collapse navbar-collapse d-lg-flex"} id="navbarsExample11">
                        <a className="navbar-brand col-lg-3 me-0" href="#">
                            <img src={logo} alt="SportClub" style={{width: "47px"}} className="rounded-pill"/>
                            SportClub</a>

                        <ul className="navbar-nav col-lg-6 justify-content-lg-center">
                            <li className="nav-item">
                                <NavLink to="/schedule" className={setActive}>Расписание</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/customers" className={setActive}>Клиенты</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/coaches" className={setActive}>Тренеры</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/group-workouts" className={setActive}>Тренировки</NavLink>
                                {!user &&
                                    <NavLink to={"/login"} className={setActive}>Вход</NavLink>
                                }
                            </li>
                        </ul>
                        {user &&
                            <div className="d-lg-flex col-lg-3 justify-content-lg-end">
                                <button onClick={logout} className="btn btn-primary">Выход</button>
                            </div>}
                    </div>
                </div>
            </nav>
            <Outlet/>
        </>
    );
}