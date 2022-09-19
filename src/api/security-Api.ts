import {instance} from "./api";

type GetCaptchaURLResponseType = {
    url:string
}

export const securityApi = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaURLResponseType>(`security/get-captcha-url`).then(res=>res.data)
    },

}