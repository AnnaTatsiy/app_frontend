import api from '../api/axios.js';

class CoachesService {

    //получение авторизированного тренера
    async getCoach() {
        return await api.get('/api/coach/get-coach');
    }

    // получить список всех тренеров
    async getAllCoaches() {
        return await api.get('/api/coaches/get-all');
    }

    // получить список всех тренеров постранично
    async getAll(number) {
        return await api.get('/api/coaches/all', {params: {page: number}});
    }

    // добавить тренера
    async add(coaches){
        return api.post('/api/coaches/add', coaches)
    }

    // редактирование тренера
    async edit(coaches){
        return api.post('/api/coaches/edit', coaches)
    }
}

export default new CoachesService();