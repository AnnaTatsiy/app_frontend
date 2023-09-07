import {createContext, useState, useContext, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../api/axios.js";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();

    const getUser = async () => {
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

     const res =   await fetch('http://127.0.0.1:8000/api/login', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            credentials: 'include',
            body: JSON.stringify(
                {
                    email,
                    password
                }
            )
        });

        if (res.ok) {
            await getUser();
            await getImage();
            navigate('/');
        } else {
            setErrors(res.status)
        }
    }

    const logout = async () => {
        await fetch('http://127.0.0.1:8000/api/logout', {
            method: 'POST',
            headers: {"Content-type": "application/json"},
            credentials: 'include'
        });

        setUser(null);
        setErrors(null);
    }

    useEffect(() => {
        if(!image){
            getImage();
        }
    }, [image]);

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [getUser, user]);

    const getImage = () => {
        api.get("http://127.0.0.1:8000/api/get-image")
            .then((response) => {
                if (response.status === 200) {
                    setImage(response.data.data);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return <AuthContext.Provider value={{user, getUser, login, logout, errors, image, getImage}}>
        {children}
    </AuthContext.Provider>
}

export default function useAuthContext() {
    return useContext(AuthContext);
}