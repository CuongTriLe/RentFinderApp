import axios from "axios";

const BASE_URL = 'https://letricuong1910.pythonanywhere.com/';

export const endpoints = {
    'houses': '/houses/',
    'rooms': (houseID) => `/houses/${houseID}/room/`,
    'house-images': (houseownerId) => `/house-owners/${houseownerId}/house-images/`,
    'room-images': (roomId) => `/rooms/${roomId}/room-images/`,
    'user-post': '/user-posts/',
    'user-post-user-comment': (userpostId) => `/user-posts/${userpostId}/user-comments/`,
    'user-post-owner-comment': (userpostId) => `/user-posts/${userpostId}/owner-comments/`,
    'owner-post': '/owner-posts/',
    'owner-post-user-comment': (ownerpostId) => `/owner-posts/${ownerpostId}/user-comments/`,
    'owner-post-owner-comment': (ownerpostId) => `/owner-posts/${ownerpostId}/owner-comments/`,
    'user-register': '/users/',
    'house-owner-register': '/house-owners/',
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'current-house-owner': '/house-owners/current-owner/'
}

export const authAPI = (token) => {
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