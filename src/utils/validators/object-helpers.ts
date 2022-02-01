import {usersType} from "../../redux/users-reducer";

export const updateObjectInArray = (items:any[], itemId:number, objPropName:any, newObjProps:any) => {
    items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjProps};
        }
        return u;
    })
}