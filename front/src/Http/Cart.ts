import {$api} from './index';



export const addToCart = async (productId: number) => {
    let res;
    res = await $api.post(`cart/add`,{ id: productId});
    return res;
};

export const getCartItems = async () => {
    let res;
    res = await $api.post(`cart/`);
    return res;
};

export const updateCartItemCount = async (id: number, status: string) => {
    let res;
    res = await $api.post(`cart/count`,{id: id, name: status});
    return res;
};
