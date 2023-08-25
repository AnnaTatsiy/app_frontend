// компонент подвала
import {ToastContainer} from "react-toastify";

export default function Footer() {
    return (
        <>
            <ToastContainer position="bottom-right" theme="dark"/>
            <div className="mt-5 p-3 bg-dark text-white-50 text-center footer">
                <p>Выполнила: Таций Анна ПД011 Донецк 2023</p>
            </div>
        </>
    )
}