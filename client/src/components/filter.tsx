import { useEffect, useState } from 'react'
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
        result = filterDate(result, filterState.date)
        result = filterRows(result)
        setFilteredReviewNotes(result)
    }

    const filterRows = (data: ReviewNote[]) => {
        let n = filterState.rows
        if (data.length < filterState.rows) n = data.length
        let result = []
        for (let i = 0; i < n; i++) {
            result.push(data[i])
        }
        return result
    }

    const filterSearch = (data: ReviewNote[], searchInput: string) => {
        if (filterState.search === "") return data
        const result = data.filter(value => {
            const searchStr = searchInput.toLowerCase()
            const matches = value.title.toLowerCase().includes(searchStr)
            return matches
        })
        return result
    }

    const filterType = (data: ReviewNote[], type: string) => {
        if (type === 'All') { return data.filter(x => x === x) }
        else { return data.filter(x => x.type === type) }
    }

    const filterStatus = (data: ReviewNote[], status: string) => {
        if (!data) return data
        if (status === 'All') { return data.filter(x => x === x) }
        else { return data.filter(x => x.status === status) }
    }

    const filterPriority = (data: ReviewNote[], priority: string) => {
        if (!data) return data
        if (priority === 'All') { return data.filter(x => x === x) }
        else { return data.filter(x => x.priority === priority) }
    }

    const filterReporter = (data: ReviewNote[], reporter: string) => {
        if (!data) return data
        if (reporter === 'All') { return data.filter(x => x === x) }
        const name = reporter
        const user = users!.filter(x => x.name === name)
        const id = user[0].id
        const result = data.filter(x => x.reporter === id)
        return result
    }

    const filterAssignees = (data: ReviewNote[], assignees: string) => {
        if (!data) return data
        if (assignees === 'All') { return data.filter(x => x === x) }
        const name = assignees
        const user = users!.filter(x => x.name === name)
        const id = user[0].id
        const result = data.filter(x => x.assignees === id)
        return result
    }

    const filterSection = (data: ReviewNote[], section: string) => {
        if (!data) return data
        if (section === 'All') { return data.filter(x => x === x) }
        if (section === 'Section not assigned') { return data.filter(x => x.section === null) }
        const result = data.filter(x => x.section === section)
        return result
    }

    const filterDate = (data: ReviewNote[], date: string) => {
        if (!data) return data
        if (date === "") return data
        const result = data.filter(x => x.dueDate === date)
        return result
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
            section: "All",
            date: ""
        })
        const reporterForm = (document.querySelector('#filterReporter') as HTMLFormElement)
        reporterForm.reset()
        const assigneesForm = (document.querySelector('#filterAssignees') as HTMLFormElement)
        assigneesForm.reset()
        const sectionForm = (document.querySelector('#filterSection') as HTMLFormElement)
        sectionForm.reset()
        const dateForm = (document.querySelector('#filterDate') as HTMLFormElement)
        dateForm.reset()
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
                className='flex gap-6 my-5'>

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
                        className={'w-16 text-sm ' + (filterState.type === 'All' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, type: 'All' } })}
                    >
                        All
                    </button>
                    <button
                        name='task'
                        className={'w-16 text-sm ' + (filterState.type === 'Task' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, type: 'Task' } })}>
                        Tasks
                    </button>
                    <button
                        name='note'
                        className={'w-16 text-sm ' + (filterState.type === 'Note' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, type: 'Note' } })}>
                        Notes
                    </button>
                </div>

                <div
                    id="filterPriority">
                    <p>Priority</p>
                    <button
                        className={'w-16 text-sm ' + (filterState.priority === 'All' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'All' } })}
                    >
                        All
                    </button>
                    <button
                        className={'w-16 text-sm ' + (filterState.priority === 'Low' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'Low' } })}
                    >
                        Low
                    </button>
                    <button
                        className={'w-16 text-sm ' + (filterState.priority === 'Medium' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
                        onClick={() => setFilterState((prevState) => { return { ...prevState, priority: 'Medium' } })}
                    >
                        Medium
                    </button>
                    <button
                        className={'w-16 text-sm ' + (filterState.priority === 'High' ? 'bg-blue-400 border border-black' : 'bg-white border border-black')}
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
                            className='text-sm border border-black' name="reporter" id="reporter"
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
                            className='text-sm border border-black' name="assignees" id="assignees"
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
                            className='text-sm border border-black' name="section" id="section"
                            value={filterState.section}
                            onChange={(event) => setFilterState((prevState) => { return { ...prevState, section: event.target.value } })}
                        >
                            <option value="All">All</option>
                            {getSectionList(reviewNotes).map((element) => {
                                return <option key={uuidv4()} value={element}>{element}</option>
                            })}
                        </select>
                    }
                </form>


                <form
                    id="filterDate"
                    className='text-sm'>
                    <p className='text-base'>Date</p>
                    <input
                        name='date'
                        type="date"
                        className='border border-black'
                        onChange={(event) => setFilterState((prevState) => { return { ...prevState, date: event.target.value } })}
                    />
                </form>

            </div>
        </div >
    )
}
