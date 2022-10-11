import axios from 'axios'
import { useEffect, useState } from 'react'
import { ReviewNote } from '../../models'


export const Table = () => {

    const [users, setUsers] = useState(null)
    const [reviewNotes, setReviewNotes] = useState<ReviewNote[] | null>(null)

    useEffect(() => {
        getUsers()
            .then((users) => setUsers(users))
        getReviewnotes()
            .then((notes) => setReviewNotes(notes.default))
    }, [])

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const getReviewnotes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/reviewnotes')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <table>
            <tr>
                <td>Title</td>
                <td>Type</td>
                <td>State</td>
                <td>Priority</td>
                <td>Due date</td>
                <td>Assignees</td>
                <td>Reporter</td>
                <td>Section</td>
                <td>Created</td>
                <td>Updated</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>Request budget documents</td>
                <td>Note</td>
                <td>Note started</td>
                <td>High</td>
                <td>15.03.2021 10:56</td>
                <td>Image</td>
                <td>Image</td>
                <td>Engagement information</td>
                <td>15.03.2021 10:56</td>
                <td>15.03.2021 12:42</td>
                <td>Link</td>

            </tr>
            <tr>
                <td>Request sales documents</td>
                <td>Note</td>
                <td>In Progress</td>
                <td>Medium</td>
                <td>15.03.2021 10:56</td>
                <td>Image</td>
                <td>Image</td>
                <td>Independence</td>
                <td>15.03.2021 10:56</td>
                <td>15.03.2021 12:42</td>
                <td>Link</td>
            </tr>
        </table>

    )
}
