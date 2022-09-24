import {instance, ApiResponseType} from "./api";
import {ResponseType} from "../redux/auth-reducer";

export const authApi = {
    me() {
        return instance.get<ResponseType>(`auth/me`).then(res=>res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        // return instance.post<LoginMeResponseType>(`auth/login`, {email, password, rememberMe, captcha})
        //     .then(res=>res.data)
        return instance.post<any>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(res=>res.data)

    },
    logout() {
        return instance.delete(`auth/login`)
    },
}

type meResponseDataType = {
    data: { id: number, email: string, login: string }
}
export type LoginMeResponseDataType = {
    userId: number
}