import axios from "axios";
import {GetItemsType,ApiResponseType} from "./api";


const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "f8b19b87-e8a3-40e0-aba2-9e995bb36bef"
    }
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`, {})
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<ApiResponseType>(`follow/${userId}`).then(res=>res.data)
    }
    ,
    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`). then(res=>res.data) as Promise<ApiResponseType>
    },
}