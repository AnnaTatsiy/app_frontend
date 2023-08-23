import {useDispatch, useSelector} from "react-redux";
import {Alert} from "react-bootstrap";
import {useEffect} from "react";
import {getAboutLimitedSubscription} from "../../actions/limitedSubscriptions/action.jsx";

export default function LimitedSubscriptionAbout() {
    const dispatch = useDispatch();
    const subscription = useSelector(state => state.limitedSubscription.selectedSubscription);

    const date = (subscription) ? new Date(subscription.open).setMonth(new Date(subscription.open).getMonth() + 1) : new Date()
    const setStyle = date >= new Date() ? "success" : "danger";

    useEffect(() => {
        dispatch(getAboutLimitedSubscription())
    }, [dispatch])

    return (
        <>
            {subscription ? <Alert variant={setStyle}>
                <Alert.Heading><span className={"ms-5 fs-5"}>Информация о абонементе с тренером:</span></Alert.Heading>
                <p>
                    <ul className={"list-style-none m-1 ms-4 fs-6"}>
                        <li>Дата оформления: <b>{new Date(subscription.open).toLocaleString().slice(0, 10)}</b></li>
                        <li>Период действия: <b>1 месяц</b></li>
                        <li>Количество тренировок: <b>{subscription.limited_price_list.amount_workout}</b></li>
                        <li>Ваш тренер: <b>{subscription.limited_price_list.coach.name.slice(0, 1)}. {subscription.limited_price_list.coach.patronymic.slice(0, 1)}. {subscription.limited_price_list.coach.surname}</b>
                        </li>
                    </ul>
                </p>
                <hr/>
                <p className="mb-0 ms-5 fs-6">
                    <b>{setStyle === "success" ? `Абонемент еще активен, срок активности абонемента итекает ${date.toLocaleDateString()}` : "У абонемента истек срок действия!"}</b>
                </p>
            </Alert> : <Alert variant={"warning"}>
                <p className={"fs-6"}>
                    У вас пока нет абонемента с тренером.
                    Если для вас это актуально, то обратитесь к администратору для оформления!
                </p>
            </Alert>}
        </>
    );
}