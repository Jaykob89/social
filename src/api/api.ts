import axios from "axios";
import {profileType} from "../components/Profile/Profile";

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
    getProfile(userId: number | null) {
        console.log('Absolute method. Please profileApi object')
        return profileAPI.getProfile(userId)
    }
}
export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId);
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status: status})
    },
    savePhoto(photoFile: string) {
        var formData = new FormData();
        formData.append('image', photoFile)
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: profileType) {
        return instance.put('profile/profile', profile)
    }
}


export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}


type meResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: string[]
}
export type LoginMeResponseType = {
    data: {userId: number}
    resultCode: ResultCodeEnum | ResultCodeForCaptcha
    messages: string[]
}

export const authApi = {
    me() {
        return instance.get<meResponseType>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginMeResponseType>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res=>res.data)
    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    },

}
