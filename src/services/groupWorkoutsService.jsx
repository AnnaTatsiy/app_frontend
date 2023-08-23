import api from '../api/axios.js';

class GroupWorkoutsService {

    // получить все доступные тренировки для записи клиента
    async getAvailableWorkouts(){
        return await api.get(`/api/customer/get-available-workouts`);
    }

    // получить список всех групповых тренировок постранично
    async getAll(number) {
        return await api.get(`/api/group-workouts/all?page=${number}`);
    }

    // получить групповую тренировку по id
    async getById(id) {
        return await api.get(`/api/group-workouts/select-by-id/${id}`);
    }

    // редактирование тренировки - возможна только отмена
    async edit(workout){
        return api.post('/api/group-workouts/group-workout-edit', workout)
    }

    // показать тренеровки по расписанию
    async getBySchedule(id, page){
        return await api.get(`/api/group-workouts/select-workouts-by-schedule`, {params: {page: page, id: id}});
    }

    //фильтрация
    async filtering(params){
        return api.get('/api/group-workouts/filtered',
            {params:
                    {
                        page: params.page,
                        date_beg: params.date_beg,
                        date_end: params.date_end,
                        coach: params.coach,
                        customer: params.customer,
                        cancelled: params.cancelled,
                        gym: params.gym,
                        type: params.type
                    }})
    }
}
export default new GroupWorkoutsService();