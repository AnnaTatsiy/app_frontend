import api from '../api/axios.js';

class UnlimitedSubscriptionsService{

    //получить информацию о абонементе для авторизированного клиента
    async getAboutSubscription() {
        return await api.get('/api/customer/about-subscription');
    }

    // получить список всех абониментов
    async getAllUnlimitedSubscriptions() {
        return await api.get('/api/unlimited-subscriptions/get-all');
    }

    // получить список всех абониментов постранично
    async getAll(number) {
        return await api.get('/api/unlimited-subscriptions/all', {params: {page: number}});
    }

    // добавить
    async add(subscription){
        return api.post('/api/unlimited-subscriptions/add', subscription);
    }
}

export default new UnlimitedSubscriptionsService();