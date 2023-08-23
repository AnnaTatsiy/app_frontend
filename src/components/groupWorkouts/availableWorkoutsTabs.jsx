import {Tab, Tabs} from "react-bootstrap";
import AvailableWorkoutsTableData from "./availableWorkoutsTableData.jsx";
import {useState} from "react";

export default function AvailableWorkoutsTabs({workouts}){
    const [key, setKey] = useState('current');

    return (<>

        <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3 mt-4"
        >
            <Tab eventKey="current" title={new Date(workouts[0].event).toLocaleString().slice(0,10)}>
                <table className={"table mt-3"}>
                    <thead>
                    <tr>
                        <th>День недели</th>
                        <th>Время</th>
                        <th>Тренер</th>
                        <th>Тип</th>
                        <th>Зал</th>
                        <th>Дата проведения</th>
                    </tr>
                    </thead>

                    <tbody>
                    {workouts.filter((a) => a.event === workouts[0].event).map((item) => (
                        <AvailableWorkoutsTableData key={item.id} workout={item}/>
                    ))}
                    </tbody>
                </table>
            </Tab>
            <Tab eventKey="next" title={new Date(workouts[workouts.length -1].event).toLocaleString().slice(0,10)}>
                <table className={"table mt-3"}>
                    <thead>
                    <tr>
                        <th>День недели</th>
                        <th>Время</th>
                        <th>Тренер</th>
                        <th>Тип</th>
                        <th>Зал</th>
                        <th>Дата проведения</th>
                    </tr>
                    </thead>

                    <tbody>
                    {workouts.filter((a) => a.event === workouts[workouts.length -1].event).map((item) => (
                        <AvailableWorkoutsTableData key={item.id} workout={item}/>
                    ))}
                    </tbody>
                </table>
            </Tab>
        </Tabs>

    </>);
}