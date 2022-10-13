import axios from 'axios'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GrLink } from 'react-icons/gr'
import { useAtom } from 'jotai'
import { usersAtom, reviewNotesAtom, filteredReviewNotesAtom, filterStateAtom } from '../../atoms'


export const Table = () => {

    const [users, setUsers] = useAtom(usersAtom)
    const [reviewNotes, setReviewNotes] = useAtom(reviewNotesAtom)
    const [filteredReviewNotes, setFilteredReviewNotes] = useAtom(filteredReviewNotesAtom)
    const [filterState, setFilterState] = useAtom(filterStateAtom)

    const runFilter = (data) => {
        if (!data) return
        let result = filterRows(data)
        result = filterSearch(result)
        result = filterType(result, filterState.type)
        result = filterStatus(result, filterState.status)
        result = filterPriority(result, filterState.priority)
        setFilteredReviewNotes(result)
    }

    const filterRows = (data) => {

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
        let result
        if (type === 'All') { return result = data.filter(x => x === x) }
        else { return result = data.filter(x => x.type === type) }
    }

    const filterStatus = (data, status) => {
        let result
        if (status === 'All') { return result = data.filter(x => x === x) }
        else { return result = data.filter(x => x.status === status) }
    }

    const filterPriority = (data, priority) => {
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

    const getPhoto = (element) => {
        const user = users.filter(user => user.id === element)
        const photo = user[0].photo
        return photo

    }

    const colNames = ["", "Title", "Type", "Status", "Priority", "Due date", "Assignees", "Reporter", "Section", "Created", "Updated"]

    return (

        <div>
            <div
                name="filterBar"
                className='flex gap-3 my-5'>
                <div
                    name="filterSeach"
                    className='flex flex-col ml-3'>
                    <br />
                    <input
                        name='searchInput'
                        type="text"
                        className='pl-4 mb-2 border border-black rounded-full'
                        onChange={(event) => setFilterState((prevState) => { return { ...prevState, search: event.target.value } })}
                        placeholder="search"
                        value={filterState.search}
                    />
                    <button
                        name='clearFilterButton'
                        className='text-sm text-left text-blue-800 underline'
                        onClick={clearFilters}
                    >
                        Clear filters
                    </button>
                </div>

                <div name="filterType">
                    <p>Type</p>
                    <button
                        name='all'
                        className={'w-20 ' + (filterState.type === 'All' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, type: 'All' } })}
                    >
                        All
                    </button>
                    <button
                        name='task'
                        className={'w-20 ' + (filterState.type === 'Task' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, type: 'Task' } })}>
                        Tasks
                    </button>
                    <button
                        name='note'
                        className={'w-20 ' + (filterState.type === 'Note' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, type: 'Note' } })}>
                        Notes
                    </button>
                </div>



                <div name="filterPriority">
                    <p>Priority</p>
                    <button
                        className={'w-20 ' + (filterState.priority === 'All' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'All' } })}
                    >
                        All
                    </button>
                    <button
                        className={'w-20 ' + (filterState.priority === 'Low' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'Low' } })}
                    >
                        Low
                    </button>
                    <button
                        className={'w-20 ' + (filterState.priority === 'Medium' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'Medium' } })}
                    >
                        Medium
                    </button>
                    <button
                        className={'w-20 ' + (filterState.priority === 'High' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'High' } })}
                    >
                        High
                    </button>
                </div>


            </div>

            <div>
                {filteredReviewNotes && (

                    <table className='w-full border border-separate table-fixed border-spacing-2'>

                        <thead>
                            <tr className='text-left'>
                                {colNames.map((element) => {
                                    if (element === '') { return <th className='w-3' key={uuidv4()}>{element}</th> }
                                    if (element === 'Title') { return <th className='w-64 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Type') { return <th className='font-semibold w-14' key={uuidv4()}>{element}</th> }
                                    if (element === 'Status') { return <th className='w-48 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Priority') { return <th className='w-20 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Due date') { return <th className='w-20 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Assignees') { return <th className='w-20 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Reporter') { return <th className='w-20 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Section') { return <th className='w-48 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Created') { return <th className='w-32 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Updated') { return <th className='w-32 font-semibold' key={uuidv4()}>{element}</th> }

                                    return <th key={uuidv4()}>{element}</th>
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            {Object.values(filteredReviewNotes).map((obj) => (

                                <tr key={uuidv4()} >
                                    <td><input type="checkbox" /></td>

                                    {Object.values(obj).map((element, index) => {
                                        if (element === 'Note') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Task') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }

                                        if (element === 'In Progress') { return <td className='text-sm text-center text-white bg-blue-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Not started') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Addressed') { return <td className='text-sm text-center text-white bg-green-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Pending documentation') { return <td className='text-sm text-center text-white bg-yellow-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Closed') { return <td className='text-sm text-center text-white bg-black border border-black' key={index}>{element}</td> }

                                        if (element === 'Engagement information') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Independence') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Scope') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }

                                        if (element === 'High') { return <td className='text-sm text-center text-white bg-red-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Medium') { return <td className='text-sm text-center text-white bg-yellow-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Low') { return <td className='text-sm text-center text-white bg-green-500 border border-black' key={index}>{element}</td> }

                                        if (element === '001') { return <td key={index}>{<img className='w-8 h-8 rounded-full' src={getPhoto(element)} title={element} alt={element} />}</td> }
                                        if (element === '002') { return <td key={index}>{<img className='w-8 h-8 rounded-full' src={getPhoto(element)} title={element} alt={element} />}</td> }

                                        return <td className='text-sm' key={uuidv4()}>{element}</td>

                                    })}

                                    <td><GrLink /></td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                )}

                <button
                    className='w-full text-blue-600 underline bg-blue-100 border border-black'
                    onClick={handleLoadMore}
                >
                    Load more
                </button>

            </div >
        </div>
    )
}
