import {NavLink, Outlet} from "react-router-dom";
import logo from "../../assets/images/favicon.ico";

export default function CustomerLayouts({user, logout}) {

    return (
        <>
            <header className="py-3 mb-3 border-bottom bg-dark">
                <div className="container">

                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            <img src={logo} alt="SportClub" style={{width: "47px"}} className="rounded-pill"/>
                        </a>

                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle link-light" href="#" data-bs-toggle="dropdown" aria-expanded="false">Записаться</a>
                                <ul className="dropdown-menu dropdown-menu-dark">
                                    <li><NavLink to="/get-available-workouts" className="dropdown-item">Групповые тренировки</NavLink></li>
                                    <li><a className="dropdown-item" href="#">Тренировки с тренером</a></li>
                                </ul>
                            </li>
                            <li><a href="#" className="nav-link px-2 link-light">Inventory</a></li>
                            <li><a href="#" className="nav-link px-2 link-light">Customers</a></li>
                            <li><a href="#" className="nav-link px-2 link-light">Products</a></li>
                        </ul>

                        <span className={"text-end text-light me-3"}>{user.name}</span>
                        <div className="dropdown text-end">
                            <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
                            </a>
                            <ul className="dropdown-menu text-small">
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><NavLink className="dropdown-item" to={"/"}>Профиль</NavLink></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><button className="dropdown-item" onClick={logout}>Выход</button></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </header>
            <Outlet/>
        </>
    );
}