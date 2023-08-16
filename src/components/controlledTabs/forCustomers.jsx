import UnlimitedSubscriptionsList from "../unlimitedSubscriptions/unlimitedSubscriptionsList";
import CustomersList from "../customers/customersList";
import LimitedSubscriptionsList from "../limitedSubscriptions/limitedSubscriptionsList";
import {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import Footer from "../footers/footer.jsx";

export default function ForCustomers(){

    const [key, setKey] = useState('customers');

    return (
        <>
        <div className="container-fluid">
            <div className="row-sm mt-5 p-3 container-fluid-style">
                <div className="p-4 bg-white m-3 border-warning-top border-warning-bottom">
                    <div className="container">
        <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="customers" title="Клиенты">
                <CustomersList/>
            </Tab>
            <Tab eventKey="subscriptions" title="Абонименты">
                <UnlimitedSubscriptionsList/>
            </Tab>
            <Tab eventKey="workouts" title="Тренировки с тренерами">
                <LimitedSubscriptionsList/>
            </Tab>

        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    <Footer/> </>
    )
}