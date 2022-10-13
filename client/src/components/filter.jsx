import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { reviewNotesAtom, filteredReviewNotesAtom, filterStateAtom } from '../atoms'

export const Filter = () => {

    const [reviewNotes, setReviewNotes] = useAtom(reviewNotesAtom)
    const [filteredReviewNotes, setFilteredReviewNotes] = useAtom(filteredReviewNotesAtom)
    const [filterState, setFilterState] = useAtom(filterStateAtom)

    useEffect(() => {
        runFilter(reviewNotes)
    }, [reviewNotes, filterState])


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

        </div>
    )
}
