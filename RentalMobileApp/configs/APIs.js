import axios from "axios";

const BASE_URL = 'https://letricuong1910.pythonanywhere.com/';

export const endpoints = {
    'owner-posts' : `/owner-posts/`,
    'user-posts' : `/user-posts/`,
    'owner-posts-details' : (ownerpostId) =>`/owner-posts/${ownerpostId}/`,
    'houses':`/houses/`,
    'rooms': (houseId) => `/houses/${houseId}/room/`,
    'register': '/users/',
    'login': '/o/token/',
    'current-user': '/users/current-user/'
};

export const authApi = (token) => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});