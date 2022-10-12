import axios from 'axios'
import { useEffect, useState } from 'react'
import { ReviewNote } from '../../models'
import { v4 as uuidv4 } from 'uuid';


export const Table = () => {

    const [users, setUsers] = useState(null)
    const [reviewNotes, setReviewNotes] = useState(null)
    const [filteredReviewNotes, setFilteredReviewNotes] = useState(null)

    const [filterState, setFilterState] = useState({
        rows: 3,
        search: "",
        type: "All",
        status: "All",
        priority: "All"
    })

    const runFilter = (data) => {
        let result = filterRows(data)
        result = filterSearch(result)
        result = filterType(result, filterState.type)
        result = filterStatus(result, filterState.status)
        result = filterPriority(result, filterState.priority)
        setFilteredReviewNotes(result)
    }

    const filterRows = (data) => {
        if (!data) return
        let result = []
        for (let i = 0; i < filterState.rows; i++) {
            if (!data[i]) return
            result.push(data[i])
        }
        return result
    }

    const filterSearch = (data) => {
        if (filterState.search === "") return data
        const searchInput = filterState.search
        const result = data.filter(value => {
            const searchStr = searchInput.toLowerCase()
            const matches = value.title.toLowerCase().includes(searchStr);
            return matches
        })
        return result
    }

    const filterType = (data, type) => {
        if (!data) return
        let result
        if (type === 'All') { return result = data.filter(x => x === x) }
        else { return result = data.filter(x => x.type === type) }
    }

    const filterStatus = (data, status) => {
        if (!data) return
        let result
        if (status === 'All') { return result = data.filter(x => x === x) }
        else { return result = data.filter(x => x.status === status) }
    }

    const filterPriority = (data, priority) => {
        if (!data) return
        let result
        if (priority === 'All') { return result = data.filter(x => x === x) }
        else { return result = data.filter(x => x.priority === priority) }
    }

    const clearFilters = () => {
        setFilterState({
            rows: 3,
            search: "",
            type: "All",
            status: "All",
            priority: "All"
        })
    }


    useEffect(() => {
        getUsers()
            .then((result) => setUsers(result))
        getReviewnotes()
            .then((result) => setReviewNotes(result))
    }, [])

    useEffect(() => {
        runFilter(reviewNotes)
    }, [reviewNotes, filterState])


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

    const handleLoadMore = () => {
        const isMaxRows = (reviewNotes.length) <= filterState.rows
        if (isMaxRows) return
        setFilterState((prevState) => { return { ...prevState, rows: filterState.rows + 3 } })
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
                        name='searchInput'
                        type="text"
                        className='border border-black'
                        onChange={(event) => setFilterState((prevState) => { return { ...prevState, search: event.target.value } })}
                        placeholder="Search for titles.."
                        value={filterState.search}
                    />
                    <button
                        name='clearFilterButton'
                        className='text-left text-blue-400 underline'
                        onClick={clearFilters}
                    >
                        clear filters
                    </button>
                </div>

                <div name="filterType">
                    <p>Type</p>
                    <button
                        name='all'
                        className='w-20 border border-black'
                        onClick={() => setFilterState((prevState) => { return { ...prevState, type: 'All' } })}
                    >
                        All
                    </button>
                    <button
                        name='task'
                        className='w-20 border border-black'
                        onClick={() => setFilterState((prevState) => { return { ...prevState, type: 'Task' } })}>
                        Tasks
                    </button>
                    <button
                        name='note'
                        className='w-20 border border-black'
                        onClick={() => setFilterState((prevState) => { return { ...prevState, type: 'Note' } })}>
                        Notes
                    </button>
                </div>



                <div name="filterPriority">
                    <p>Priority</p>
                    <button
                        className='w-20 border border-black'
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'All' } })}
                    >
                        All
                    </button>
                    <button className='w-20 border border-black'
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'Low' } })}
                    >
                        Low
                    </button>
                    <button
                        className='w-20 border border-black'
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'Medium' } })}
                    >
                        Medium
                    </button>
                    <button
                        className='w-20 border border-black'
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'High' } })}
                    >
                        High
                    </button>
                </div>


            </div>

            <div>
                {filteredReviewNotes && (

                    <table className='w-full'>

                        <thead>
                            <tr className='text-left'>
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
