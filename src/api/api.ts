import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "f8b19b87-e8a3-40e0-aba2-9e995bb36bef"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`, {}).then(response => response.data)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`)
    }
    ,
    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: string) {
        console.log('Obsolute method. Please profileApi object')
        return profileAPI.getProfile(userId)
    }
}
export const profileAPI = {
    getProfile(userId: string) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: string) {
        return instance.get('profile/status/' + userId);
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status: status})
    }
}

export const authApi = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}


