import {useState} from "react";
import useAuthContext from "./context/authContext.jsx";
import {Alert} from "react-bootstrap";

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword]  = useState('');
    const {login, errors} = useAuthContext()

    const submit = async (e) =>{
        e.preventDefault();

        login({email,password})
    }

    return (<>
        <div className=" row-sm p-3 container-fluid-login">
            <main className="form-signin m-auto mt-5">
            <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Пожалуйста войдите</h1>

                {errors &&
                    <Alert variant={"danger"}>Некорректный логин или пароль</Alert>
                }

                    <div className="form-floating">
                        <input id={"emailInput"} onChange={e => setEmail(e.target.value)} required={true} type="email" className="form-control" placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">Электронная почта</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input onChange={e => setPassword(e.target.value)} required={true} type="password" className="form-control"  placeholder="Password"/>
                            <label htmlFor="floatingPassword">Пароль</label>
                    </div>

                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Войти</button>
            </form>
        </main>
        </div>
    </>);
}