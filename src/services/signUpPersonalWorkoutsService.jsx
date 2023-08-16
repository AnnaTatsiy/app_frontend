import api from '../api/axios.js';

class SignUpPersonalWorkoutsService{

    // получить список всех тренировок постранично
    async getAll(number) {
        return await api.get(`/api/sign-up-personal-workouts/all?page=${number}`);
    }

    //фильтрация
    async filtering(params){
        return api.get('/api/sign-up-personal-workouts/filtered/',
            {params:
                    {
                        page: params.page,
                        date_beg: params.date_beg,
                        date_end: params.date_end,
                        coach: params.coach,
                        customer: params.customer
                    }})
    }
}

export default new SignUpPersonalWorkoutsService();