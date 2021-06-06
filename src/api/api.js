import * as axios from 'axios'

const BASE_URL = 'https://social-network.samuraijs.com/api/1.0'

const instance = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: { "API-KEY": "0e708d23-6371-41d7-b657-35b55438ea73" }
}
)

export const userAPI = {
    getUsersAPI(currentPage, pageSize) {
        return instance.get(`/users?page=
        ${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    postFollow(userID) {
        return instance.post(`/follow/${userID}`)
            .then(response => response.data)
    },
    deleteFollow(userID) {
        return instance.delete(`/follow/${userID}`)
            .then(response => response.data)
    },
}

export const profileAPI = {
    getProfile(userID) {
        return instance.get(`/profile/${userID}`)
            .then(response => response.data)
    },
    updateUserStatus(status) {
        return instance.put(`/profile/status`, { status: status })
            .then(response => response.data)
    },
    getUserStatus(userID) {
        return instance.get(`/profile/status/${userID}`)
            .then(response => {
                return response.data
            })
    },
}

export const authAPI = {
    me() {
        return instance.get(`/auth/me`)
            .then(response => response.data)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`/auth/login`, { email, password, rememberMe })
    },
    logout() {
        return instance.delete(`/auth/login`)
    }
}