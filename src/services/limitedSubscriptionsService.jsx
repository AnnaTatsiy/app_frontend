import api from '../api/axios.js';

class LimitedSubscriptionsService{

    //получить информацию о абонементе для авторизированного клиента
    async getAboutSubscription() {
        return await api.get('/api/customer/about-subscription-with-coach');
    }

    // получить список всех подписок на тренировки с тренером
    async getAllLimitedSubscriptions() {
        return await api.get('/api/limited-subscriptions/get-all');
    }

    // получить список всех подписок на тренировки с тренером постранично
    async getAll(number) {
        return await api.get('/api/limited-subscriptions/all', {params: {page: number}});
    }

    // добавить
    async add(subscription){
        return api.post('/api/limited-subscriptions/add', subscription);
    }

}

export default new LimitedSubscriptionsService();