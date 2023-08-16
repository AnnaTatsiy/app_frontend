import api from '../api/axios.js';

class ScheduleService {

    //получить расписание
    async getAll(){
        return await api.get('/api/schedules/all')
    }
}

export default new ScheduleService();