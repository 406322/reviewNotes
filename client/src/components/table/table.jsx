import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ReviewNote } from '../../models'
import { v4 as uuidv4 } from 'uuid';


export const Table2 = () => {

    const [users, setUsers] = useState(null)
    const [reviewNotes, setReviewNotes] = useState(null)
    const [filteredReviewNotes, setFilteredReviewNotes] = useState(null)
    const [rows, setRows] = useState(3)

    useEffect(() => {
        getUsers()
            .then((users) => setUsers(users))
        getReviewnotes()
            .then((notes) => setReviewNotes(notes))
    }, [])

    useEffect(() => {
        filterData()
    }, [reviewNotes])

    useEffect(() => {
        filterData()
    }, [rows])

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const filterData = () => {
        let filteredData = []
        if (!reviewNotes) return
        for (let i = 0; i < rows; i++) {
            if (!reviewNotes[i]) return
            filteredData.push(reviewNotes[i])
        }
        setFilteredReviewNotes(filteredData)
    }

    const colNames = [
        "Title",
        "Type",
        "State",
        "Priority",
        "Due date",
        "Assignees",
        "Reporter",
        "Section",
        "Created",
        "Updated",
    ]

    const getReviewnotes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/reviewnotes')
            return response.data
        } catch (error) {
            console.error(error)
        }
    }

    const handleSearch = (event, array) => {
        const searchInput = event.target.value
        const filteredData = array.filter(value => {
            const searchStr = searchInput.toLowerCase()
            const matches = value.title.toLowerCase().includes(searchStr);
            return matches
        })
        setFilteredReviewNotes(filteredData);
    }

    return (

        <div>

            <input
                type="text"
                className='border border-black'
                onChange={(event) => handleSearch(event, reviewNotes)}
                placeholder="Search for titles.." />

            <div>
                {filteredReviewNotes && (

                    <table>

                        <thead>
                            <tr>
                                {colNames.map((element, index) => (
                                    <th key={uuidv4()}>
                                        {element}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>

                            {Object.values(filteredReviewNotes).map((obj, index) => (
                                <tr key={uuidv4()} >

                                    {
                                        Object.values(obj).map((value, index2) => (
                                            <td key={index2}>{value}</td>
                                        ))
                                    }

                                </tr>
                            ))}

                        </tbody>
                    </table>
                )}

                <button
                    className='bg-blue-100 border border-black'
                    onClick={() => setRows((prev) => prev + 3)}
                >
                    Load more
                </button>

            </div >
        </div>
    )
}
