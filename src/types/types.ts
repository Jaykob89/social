export type photosType = {
    small: string
    large: string
}

export type usersType = {
    id: number
    followed: boolean
    name: string
    photoUrl: string
    status: string
    photos: photosType
    location: { city: string, country: string }
}