import axios from 'axios'


export const getUsers = async () => {
    try {
        const response = await axios.get('http://localhost:8080/users')
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getReviewnotes = async () => {
    try {
        const response = await axios.get('http://localhost:8080/reviewnotes')
        return response.data
    } catch (error) {
        console.error(error)
    }
}