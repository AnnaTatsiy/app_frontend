import api from '../api/axios.js';

class GymsService {

    async getAll(){
        return await api.get('/api/gyms/get-all');
    }

}

export default new GymsService();