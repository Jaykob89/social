// export const usersAPI = {
//     getUsers(currentPage = 1, pageSize = 10) {
//         return instance.get(`users?page=${currentPage}&count=${pageSize}`, {}).then(response => response.data)
//     },
//     follow(userId: number) {
//         return instance.post(`follow/${userId}`)
//     }
//     ,
//     unFollow(userId: number) {
//         return instance.delete(`follow/${userId}`)
//     },
//     getProfile(userId: number | null) {
//         console.log('Absolute method. Please profileApi object')
//         return profileAPI.getProfile(userId)
//     }
// }
import {profileType} from "../components/Profile/Profile";
import {instance} from "./api";
import {photosType} from "../types/types";


type savePhotoResponseDataType = {
    photos:photosType
}

export const profileAPI = {
    getProfile(userId: number | null) {
        return instance.get<profileType>(`profile/` + userId).then(res=>res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId).then(res=>res.data)
    },
    updateStatus(status: string) {
        return instance.put<any>('profile/status', {status: status}).then(res=>res.data)
    },

    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile)
        return instance.put<any>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res=>res.data)
    },
    saveProfile(profile: profileType) {
        return instance.put<any>('profile/profile', profile).then(res=>res.data)
    }
}