import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { reviewNotesAtom, filteredReviewNotesAtom, filterStateAtom, usersAtom } from '../atoms'
import { ReviewNote } from '../models'
import { v4 as uuidv4 } from 'uuid'


export const Filter = () => {

    const [users, setUsers] = useAtom(usersAtom)
    const [reviewNotes, setReviewNotes] = useAtom(reviewNotesAtom)
    const [filteredReviewNotes, setFilteredReviewNotes] = useAtom(filteredReviewNotesAtom)
    const [filterState, setFilterState] = useAtom(filterStateAtom)

    useEffect(() => {
        if (reviewNotes) runFilter(reviewNotes)
    }, [reviewNotes, filterState])


    const runFilter = (data: ReviewNote[]) => {

        let result = filterSearch(data, filterState.search)
        result = filterType(result!, filterState.type)
        result = filterStatus(result, filterState.status)
        result = filterPriority(result, filterState.priority)
        result = filterReporter(result, filterState.reporter)
        result = filterAssignees(result, filterState.assignees)
        result = filterSection(result, filterState.section)
        result = filterRows(result)
        setFilteredReviewNotes(result)
    }



    const filterRows = (data: ReviewNote[]) => {
        try {
            let n = filterState.rows
            if (data.length < filterState.rows) n = data.length
            let result = []
            for (let i = 0; i < n; i++) {
                result.push(data[i])
            }
            return result
        } catch (error) {
            console.log(error)
            return data
        }
    }



    const filterSearch = (data: ReviewNote[], searchInput: string) => {
        try {
            if (filterState.search === "") return data
            const result = data.filter(value => {
                const searchStr = searchInput.toLowerCase()
                const matches = value.title.toLowerCase().includes(searchStr)
                return matches
            })
            return result
        } catch (error) {
            console.log(error)
        }


    }

    const filterType = (data: ReviewNote[], type: string) => {
        try {
            if (type === 'All') { return data.filter(x => x === x) }
            else { return data.filter(x => x.type === type) }
        } catch (error) {
            console.log(error)
            return data
        }
    }




    const filterStatus = (data: ReviewNote[], status: string) => {
        try {
            if (!data) return data
            if (status === 'All') { return data.filter(x => x === x) }
            else { return data.filter(x => x.status === status) }
        } catch (error) {
            console.log(error)
            return data
        }
    }




    const filterPriority = (data: ReviewNote[], priority: string) => {
        try {
            if (!data) return data
            if (priority === 'All') { return data.filter(x => x === x) }
            else { return data.filter(x => x.priority === priority) }
        } catch (error) {
            console.log(error)
            return data
        }
    }


    const filterReporter = (data: ReviewNote[], reporter: string) => {
        try {
            if (!data) return data
            if (reporter === 'All') { return data.filter(x => x === x) }
            const name = reporter
            const user = users!.filter(x => x.name === name)
            const id = user[0].id
            const result = data.filter(x => x.reporter === id)
            return result
        } catch (error) {
            console.log(error)
            return data
        }
    }



    const filterAssignees = (data: ReviewNote[], assignees: string) => {
        try {
            if (!data) return data
            if (assignees === 'All') { return data.filter(x => x === x) }
            const name = assignees
            const user = users!.filter(x => x.name === name)
            const id = user[0].id
            const result = data.filter(x => x.assignees === id)
            return result
        } catch (error) {
            return data
        }
    }

    const filterSection = (data: ReviewNote[], section: string) => {
        try {
            if (!data) return data
            if (section === 'All') { return data.filter(x => x === x) }
            //if (!users) return
            const result = data.filter(x => x.section === section)
            return result
        } catch (error) {
            console.log(error)
            return data
        }
    }

    const clearFilters = () => {
        setFilterState({
            rows: 3,
            search: "",
            type: "All",
            status: "All",
            priority: "All",
            reporter: "All",
            assignees: "All",
            section: "All"
        })
        const reporterForm = (document.querySelector('#filterReporter') as HTMLFormElement)
        reporterForm.reset()
        const assigneesForm = (document.querySelector('#filterAssignees') as HTMLFormElement)
        assigneesForm.reset()
    }

    const getSectionList = (array: ReviewNote[]) => {
        const sectionList = array.map(note => { return note.section })
        let uniqueSectionList = [...new Set(sectionList)]
        const newArray = uniqueSectionList.map(note => {
            if (note === null) return 'Section not assigned'
            return note
        })
        return newArray
    }

    return (
        <div>

            <div
                id="filterBar"
                className='flex gap-3 my-5'>
                <div
                    id="filterSeach"
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


                <div
                    id="filterType">
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


                <div
                    id="filterPriority">
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


                <form
                    id='filterReporter'>
                    <p>Reporter</p>
                    {users &&
                        < select
                            className='border border-black' name="reporter" id="reporter"
                            onChange={(event) => setFilterState((prevState) => { return { ...prevState, reporter: event.target.value } })}
                        >
                            <option value="All">All</option>
                            {users.map((user) => {
                                return <option key={user.id} value={user.name}>{user.name}</option>
                            })}
                        </select>
                    }
                </form>


                <form
                    id='filterAssignees'>
                    <p>Assignees</p>
                    {users &&
                        < select
                            className='border border-black' name="assignees" id="assignees"
                            onChange={(event) => setFilterState((prevState) => { return { ...prevState, assignees: event.target.value } })}
                        >
                            <option value="All">All</option>
                            {users.map((user) => {
                                return <option key={user.id} value={user.name}>{user.name}</option>
                            })}
                        </select>
                    }
                </form>


                <form
                    id='filterSection'>
                    <p>Section</p>
                    {reviewNotes &&
                        < select
                            className='border border-black' name="section" id="section"
                            onChange={(event) => setFilterState((prevState) => { return { ...prevState, section: event.target.value } })}
                        >
                            <option value="All">{filterState.section}</option>
                            {getSectionList(reviewNotes).map((value) => {
                                return <option key={uuidv4()} value={value}>{value}</option>
                            })}
                        </select>
                    }
                </form>

            </div>

        </div >
    )
}
