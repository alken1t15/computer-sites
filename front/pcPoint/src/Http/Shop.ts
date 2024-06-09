import {$api, $host} from './index';



export const getShopItems = async () => {
    let res = await $host.get(`computer/`);

    return res;
};

export const getShopItem = async (id: number) => {
    let res;
    res = await $api.get(`product/${id}`);
    return res;
};

