import api from '../api/axios.js';

class SignUpPersonalWorkoutsService{

    // получить список всех тренировок постранично
    async getAll(number) {
        return await api.get(`/api/sign-up-personal-workouts/all?page=${number}`);
    }

    // получить список тренировок заданного тренера постранично
    async getAllByCoach(id, page){
        return await api.get(`/api/sign-up-personal-workouts/get-sign-up-personal-workouts-by-coach/${id}/${page}`);
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