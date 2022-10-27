import axios from 'axios'

export const getUsers = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/users`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}

export const getReviewnotes = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_URL}/reviewnotes`)
        return response.data
    } catch (error) {
        console.error(error)
    }
}