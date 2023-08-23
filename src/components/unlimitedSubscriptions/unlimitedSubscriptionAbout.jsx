import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAboutSubscription} from "../../actions/unlimitedSubscriptions/action.jsx";
import {Alert} from "react-bootstrap";

export default function UnlimitedSubscriptionAbout(){
    const dispatch = useDispatch();

    const subscription =  useSelector(state => state.unlimitedSubscription.selectedSubscription);

    const date = (subscription) ? new Date(subscription.open).setMonth(new Date(subscription.open).getMonth() + subscription.unlimited_price_list.validity_period) : new Date()
    const setStyle = date >= new Date() ? "success" : "danger";

    useEffect( () => {
        dispatch(getAboutSubscription())
    }, [dispatch])

    return (
        <>
            {subscription && <Alert variant={setStyle}>
                <Alert.Heading><span className={"ms-5 fs-5"}>Информация о абонементе:</span></Alert.Heading>
                <p>
                    <ul className={"list-style-none m-1 ms-4 fs-6"}>
                        <li>Дата оформления: <b>{new Date(subscription.open).toLocaleString().slice(0,10)}</b></li>
                        <li>Период действия: <b>{subscription.unlimited_price_list.validity_period} мес.</b></li>
                        <li>
                            <ul className={"ms-3 m-1 fs-6"}>
                                <li>Тариф: <b>{subscription.unlimited_price_list.subscription_type.title}</b></li>
                                <li>SPA: <b>{subscription.unlimited_price_list.subscription_type.spa === 0 ? "Нет" : "Да"}</b></li>
                                <li>Бассейн: <b>{subscription.unlimited_price_list.subscription_type.pool === 0 ? "Нет" : "Да"}</b></li>
                                <li>Групповые теренировки: <b>{subscription.unlimited_price_list.subscription_type.group === 0 ? "Нет" : "Да"}</b></li>
                            </ul>
                        </li>
                    </ul>
                </p>
                <hr />
                <p className="mb-0 ms-5 fs-6">
                    <b>{ setStyle === "success" ? `Абонемент еще активен, срок активности абонемента итекает ${new Date(date).toLocaleString().slice(0,10)}` : "У абонемента истек срок действия!"}</b>
                </p>
            </Alert>}
        </>
        );
}