import SignUpPersonalWorkoutsByCoachTableData from "./signUpPersonalWorkoutsByCoachTableData.jsx";

export default function SignUpPersonalWorkoutsByCoachTab({workouts}){
    return (<>

        {(workouts.length !== 0) ? <>
            <div className="row row-cols-auto mt-4">
                {workouts.map((item) => (
                    <SignUpPersonalWorkoutsByCoachTableData key={item.id} workout={item}/>
                ))}
            </div>
        </> : <p className={"text-dark m-3 mt-4"}>Нет тренеровок назначенных на этот день недели</p>}

    </>);
}