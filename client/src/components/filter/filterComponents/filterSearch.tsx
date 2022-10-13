import { useAtom } from 'jotai'
import { filterStateAtom } from '../../../atoms'


export const FilterSearch = () => {

    const [filterState, setFilterState] = useAtom(filterStateAtom)

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

    return (
        <div
            id="filterSearch"
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
    )
}


