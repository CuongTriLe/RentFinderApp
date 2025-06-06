import axios from "axios";

const BASE_URL = 'https://letricuong1910.pythonanywhere.com/';

export const endpoints = {
    'owner-posts' : `/owner-posts/`,
    'user-posts' : `/user-posts/`,
    'owner-posts-details' : (ownerpostId) => `/owner-posts/${ownerpostId}/`,
    'owner-posts-comments-post': (ownerpostId) => `/owner-posts/${ownerpostId}/user-comment/`,
    'user-posts-lists': (userId) => `/users/${userId}/user-posts/`,
    'owner-posts-lists': (userId) => `/users/${userId}/owner-posts/`,
    'owner-posts-comments':(ownerpostId) => `/owner-posts/${ownerpostId}/user-comments`,
    'user-posts-details': (userpostId) => `/user-posts/${userpostId}/`,
    'user-posts-comments': (userpostId) => `/user-posts/${userpostId}/user-comments/`,
    'user-posts-comments-post': (userpostId) => `/user-posts/${userpostId}/user-comment/`,
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