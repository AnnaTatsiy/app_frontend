import axios from "axios";

export default axios.create({
        // адрес сервера
        baseURL: "http://127.0.0.1:8000",
        withCredentials: true,

        // заголовки запросов
        headers: {
            'Access-Control-Allow-Origin': 'api/*',
            'Access-Control-Allow-Headers': 'Content-Type',
            "Content-type": "application/json"}
    }
);