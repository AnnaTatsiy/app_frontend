import CoachesList from "../coaches/coachesList";
import LimitedPriceLists from "../limitedPriceLists/limitedPriceLists";
import {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import Footer from "../footers/footer.jsx";

export default function ForCoaches() {

    const [key, setKey] = useState('coaches');

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
                                <Tab eventKey="coaches" title="Тренеры">
                                    <CoachesList/>
                                </Tab>
                                <Tab eventKey="price" title="Прайс на тренировки">
                                    <LimitedPriceLists/>
                                </Tab>
                            </Tabs></div>
                    </div>
                </div>
            </div>
            <Footer/> </>
    )

}
