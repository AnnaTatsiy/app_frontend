import {useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import GroupWorkoutsList from "../groupWorkouts/groupWorkoutsList";
import SignUpPersonalWorkoutsList from "../signUpPersonalWorkouts/signUpPersonalWorkoutsList";
import Footer from "../footers/footer.jsx";

export default function ForWorkouts() {

    const [key, setKey] = useState('group');

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
                                <Tab eventKey="group" title="Групповые тренировки">
                                    <GroupWorkoutsList/>
                                </Tab>
                                <Tab eventKey="personal" title="Персональные тренировки">
                                    <SignUpPersonalWorkoutsList/>
                                </Tab>
                            </Tabs></div>
                    </div>
                </div>
            </div>
            <Footer/> </>)
}