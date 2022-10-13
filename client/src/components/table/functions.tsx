import { Users } from "../../models"


export const getPhoto = (users: Users[] | null, element: string) => {
    if (!users) return
    const user = users.filter(user => user.id === element)
    const photo = user[0].photo
    return photo

}

export const formatDate = (string: string) => {
    const day = string.slice(8, 10)
    const month = string.slice(5, 7)
    const year = string.slice(0, 4)
    return day + '.' + month + '.' + year
}

export const isDate = (dateString: any) => {
    if (typeof dateString !== 'string') return
    var d = new Date(dateString);
    var dNum = d.getTime();
    if (!dNum && dNum !== 0) return false
    return d.toISOString().slice(0, 10) === dateString;
}