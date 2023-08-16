import api from '../api/axios.js';

class LimitedPriceListsService{

    //получить прайс лист
    async getAllLimitedPriceLists(){
        return await api.get('/api/limited-price-lists/get-all');
    }

    //получить прайс лист постранично
    async getAll(number){
        return await api.get('/api/limited-price-lists/all', {params: {page: number}});
    }
}

export default new LimitedPriceListsService();