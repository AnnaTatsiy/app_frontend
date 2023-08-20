import {createContext, useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate();

    const getUser = async () =>{
        const response = await fetch('http://127.0.0.1:8000/api/user', {
            headers: {"Content-type": "application/json"},
            credentials: 'include',
        });

        const content = await response.json();
        setUser({
            name: content.name,
            email: content.email,
            role: content.role
        });
    }

    const login = async ({email, password}) => {

        await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify(
                {
                    email,
                    password
                }
            )
        })

        await getUser();
        navigate('/');
    }

    const logout = async () => {
        await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            credentials: 'include'
        });

        setUser(null);
    }

    useEffect(() => {
        if(!user){
            getUser();
        }
    }, [getUser, user]);

    return <AuthContext.Provider value={{user, getUser, login, logout}}>
        {children}
    </AuthContext.Provider>
}

export default function useAuthContext(){
    return useContext(AuthContext);
}