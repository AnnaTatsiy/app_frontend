import useAuthContext from "../context/authContext.jsx";
import {Navigate, Outlet} from "react-router-dom";

export default function GuestLayouts(){

    const {user} = useAuthContext();

    return !user ? <Outlet/> : <Navigate to={"/"}/>

}