import useAuthContext from "../context/authContext.jsx";
import {Navigate} from "react-router-dom";
import AdminLayouts from "./adminLayouts.jsx";
import CustomerLayouts from "./customerLayouts.jsx";

export default function AuthLayouts() {

    const {user, logout} = useAuthContext();

    return user ? (user.role === "admin" ? <AdminLayouts user={user} logout={logout}/> : <CustomerLayouts user={user} logout={logout}/>) : <Navigate to={"/login"}/>
}