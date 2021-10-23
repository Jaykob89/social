import axios from "axios";
import {follow} from "../redux/users-reducer";

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
    getProfile(userId:string){
        return instance.get(`profile/` + userId)
    }

}
export const authApi = {
    me() {
        return instance.get(`auth/me`)
    }
}


// export const getUsers2 = (currentPage = 1, pageSize = 10) => {
//     return instance.get(`follow?page=${currentPage}&count=${pageSize}`, {
//     }).then(response => response.data)
// }

