import axios from "axios";

const BASE_URL = 'https://letricuong1910.pythonanywhere.com/';

export const endpoints = {
    'owner-posts' : `/owner-posts/`,
    'user-posts' : `/user-posts/`,
    'owner-posts-details' : (ownerpostId) =>`/owner-posts/${ownerpostId}/`,
    'houses':`/houses/`,
    'rooms': (houseId) => `/houses/${houseId}/room/`
};

export const authApi = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer...`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});