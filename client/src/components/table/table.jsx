import axios from 'axios'
import { useEffect, useState } from 'react'
import { ReviewNote } from '../../models'
import { v4 as uuidv4 } from 'uuid';


export const Table2 = () => {

    const [users, setUsers] = useState(null)
    const [reviewNotes, setReviewNotes] = useState(null)
    const [filteredReviewNotes, setFilteredReviewNotes] = useState(null)
    const [rows, setRows] = useState(3)


    useEffect(() => {
        getUsers()
            .then((result) => setUsers(result))
        getReviewnotes()
            .then((result) => setReviewNotes(result))
    }, [])

    useEffect(() => {
        filterRows()
    }, [reviewNotes])

    useEffect(() => {
        filterRows()
    }, [rows])

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

    const filterRows = () => {
        if (!reviewNotes) return
        let result = []
        for (let i = 0; i < rows; i++) {
            if (!reviewNotes[i]) return
            result.push(reviewNotes[i])
        }
        setFilteredReviewNotes(result)
    }

    const filterSearch = (event, array) => {
        const searchInput = event.target.value
        const result = array.filter(value => {
            const searchStr = searchInput.toLowerCase()
            const matches = value.title.toLowerCase().includes(searchStr);
            return matches
        })
        setFilteredReviewNotes(result);
    }

    const filterType = (type) => {
        let result
        if (type === 'All') { result = reviewNotes.filter(x => x === x) }
        else { result = reviewNotes.filter(x => x.type === type) }
        console.log(result)
    }

    const clearFilters = () => {
        setFilteredReviewNotes(reviewNotes)
        setRows(3)
    }

    const handleLoadMore = () => {
        setRows((prev) => prev + 3)
    }

    const colNames = ["Title", "Type", "Status", "Priority", "Due date", "Assignees", "Reporter", "Section", "Created", "Updated"]

    return (


        <div>

            <div
                name="filterBar"
                className='flex gap-3 my-5'>
                <div
                    name="filterSeach"
                    className='flex flex-col'>
                    <br />
                    <input
                        type="text"
                        className='border border-black'
                        onChange={(event) => filterSearch(event, reviewNotes)}
                        placeholder="Search for titles.." />
                    <button
                        className='text-left text-blue-400 underline'
                        onClick={clearFilters}
                    >
                        clear filters
                    </button>
                </div>

                <div
                    name="filterType"
                >
                    <p>Type</p>
                    <button
                        className='w-20 border border-black'
                        onClick={() => filterType('All')}
                    >
                        All
                    </button>
                    <button className='w-20 border border-black'
                        onClick={() => filterType('Task')}>
                        Tasks
                    </button>
                    <button
                        className='w-20 border border-black'
                        onClick={() => filterType('Note')}>
                        Notes
                    </button>
                </div>
            </div>




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

                                    {/* {
                                        Object.values(obj).map((value, index2) => (
                                            <td key={index2}>{value}</td>
                                        ))
                                    } */}

                                    {Object.values(obj).map((element, index) => {
                                        if (element === 'High') { return <td className='text-center text-white bg-red-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Medium') { return <td className='text-center text-white bg-yellow-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Low') { return <td className='text-center text-white bg-green-500 border border-black' key={index}>{element}</td> }
                                        return <td key={index}>{element}</td>

                                    })}

                                </tr>
                            ))}

                        </tbody>
                    </table>
                )}

                <button
                    className='bg-blue-100 border border-black'
                    onClick={handleLoadMore}
                >
                    Load more
                </button>

            </div >
        </div>
    )
}
