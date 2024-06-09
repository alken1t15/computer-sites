import {$api, $host} from './index';
import {SIGN_IN_ROUTE} from "../Utils/Routes";


export const login = async (login: string, password: string) => {
    let res = await $host.post(`user/jwt`, {"email": login, "password": password});
    return res;
};

export const signUp = async (email: string, phone: string, name: string, password: string) => {
    let res = await $host.post(`user/add`, {"email": email, "name": name, "password": password, "phone":phone});
    return res;
};

export const getInfo = async () => {
    let res;
    res = await $api.get(`login/info`);
    return res;
};

export const getPersonalInfo = async () => {
    let res;
    res = await $api.get(`login/`);
    return res;
};

export const deleteUser = async () => {
    let res;
    res = await $api.get(`login/remove`);
    return res;
};



export const logOut = () => {
    localStorage.setItem('token', '');
    sessionStorage.setItem('token', '');
    window.location.href = SIGN_IN_ROUTE;
};