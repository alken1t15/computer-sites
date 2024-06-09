import {$api} from './index';


export const addOrder = async (number: string, date: string, security: string, name: string, address: string) => {
    let res;
    res = await $api.post(`/history/add`,{number: number,date:date, security:security, name:name, address:address });
    return res;
};

export const getHistoryOrders = async () => {
    let res;
    res = await $api.post(`/history/order/`,{isActive: true });
    return res;
};



