import ScheduleItem from "./scheduleItem.jsx";

export default function ScheduleTable({workouts}){

    return (<>
        <table className={"table mt-3"}>
            <thead>
            <tr>
                <th>Время занятий</th>
                <th>Тип тренировки</th>
                <th>Тренер</th>
                <th>№ Зала</th>
                <th className={"text-primary text-md-center"}>Показать тренировки...</th>
            </tr>
            </thead>

            <tbody>
            {workouts.map((item) => (
                <ScheduleItem key={item.id} schedule={item}/>
            ))}
            </tbody>
        </table>
    </>);
}