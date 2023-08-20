import api from '../api/axios.js';

class SignUpGroupWorkoutsService{

    //получить всю информацию о записях на групповые тренировки по id тенировки
    async getById(id) {
        return await api.get(`/api/sign-up-group-workouts/select-by-workout-id/${id}`);
    }

}
export default new SignUpGroupWorkoutsService();