import {$api, $host} from './index';



export const getShopItems = async (name: string) => {
    let res;
    if(name !== ''){
        res = await $host.get(`computer/?name=${name}`);
    }
    else{
        res = await $host.get(`computer/`);
    }



    return res;
};

export const getShopItem = async (id: string) => {
    let res;
    res = await $host.get(`computer/${id}`);
    return res;
};

