import http from "./httpService";
const localHost = 'http://192.168.43.171';
const serverHost = 'http://78.47.189.94';


export const registerUser = user => {
    return http.post(`${localHost}/register`, user);
};

export const loginUser = (user) => {
    return http.post(`${localHost}/login`, user);
};

export const forgetpassword = email => {
    return http.post(`${localHost}/forgetpassword`, email);
};

export const resetpassword = id => {
    return http.post(`${localHost}/resetpassword`, id);
};


