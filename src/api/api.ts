import axios from "axios";
import {usersType} from "../types/types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": "f8b19b87-e8a3-40e0-aba2-9e995bb36bef"
    }
})


export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: usersType[]
    totalCount: number
    error: string | null
}

export type ApiResponseType<D = {}, RC = ResultCodeEnum> = {
    data: D
    messages: string[]
    resultCode: RC
}
