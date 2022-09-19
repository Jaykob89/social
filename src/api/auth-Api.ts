import {instance, ApiResponseType, ResultCodeEnum, ResultCodeForCaptcha} from "./api";

export const authApi = {
    me() {
        return instance.get<ApiResponseType<meResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        // return instance.post<LoginMeResponseType>(`auth/login`, {email, password, rememberMe, captcha})
        //     .then(res=>res.data)
        return instance.post<ApiResponseType<LoginMeResponseDataType,ResultCodeEnum | ResultCodeForCaptcha>>(`auth/login`, {
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