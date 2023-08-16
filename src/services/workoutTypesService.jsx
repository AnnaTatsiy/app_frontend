import api from '../api/axios.js';

class WorkoutTypesService{

    async getAll(){
        return await api.get('/api/workout-types/get-all');
    }
}

export default new WorkoutTypesService();