import {Route, Routes} from "react-router-dom";
import Home from "./components/home.jsx";
import Login from "./components/login.jsx";
import AuthLayouts from "./components/layouts/authLayouts.jsx";
import GuestLayouts from "./components/layouts/guestLayouts.jsx";
import Schedule from "./components/schedule/schedule.jsx";
import ForCustomers from "./components/controlledTabs/forCustomers.jsx";
import ForCoaches from "./components/controlledTabs/forCoaches.jsx";
import ForWorkouts from "./components/controlledTabs/forWorkouts.jsx";
import GroupWorkoutDetails from "./components/groupWorkouts/groupWorkoutDetails.jsx";
import GroupWorkoutBySchedule from "./components/groupWorkouts/groupWorkoutBySchedule.jsx";
import AvailableWorkoutsList from "./components/groupWorkouts/availableWorkoutsList.jsx";
import Settings from "./components/settings.jsx";
import SignUpPersonalWorkoutsByCoach from "./components/signUpPersonalWorkouts/signUpPersonalWorkoutsByCoach.jsx";

function App() {
    return (
        <Routes>
            <Route element={<AuthLayouts/>}>
                <Route path={"/"} element={<Home/>}/>

                <Route path={"/schedule"} element={<Schedule/>}/>
                <Route path={"/customers"} element={<ForCustomers/>}/>
                <Route path={"/coaches"} element={<ForCoaches/>}/>
                <Route path={"/group-workouts"} element={<ForWorkouts/>}/>
                <Route path={"/group-workouts/selected-by-id"} element={<GroupWorkoutDetails/>}/>
                <Route path={"/group-workouts/select-workouts-by-schedule"} element={<GroupWorkoutBySchedule/>}/>
                <Route path={"/settings"} element={<Settings/>}></Route>

                <Route path={"/personal-workouts/select-workouts-by-coach"} element={<SignUpPersonalWorkoutsByCoach/>}/>

                <Route path={"/get-available-workouts"} element={<AvailableWorkoutsList/>}/>

            </Route>
            <Route element={<GuestLayouts/>}>
                <Route path={"/login"} element={<Login/>}/>
            </Route>
        </Routes>
    )
}

export default App
