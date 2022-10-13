import { useAtom } from 'jotai'
import { filterStateAtom } from '../../../atoms'

export const FilterPriority = () => {

    const [filterState, setFilterState] = useAtom(filterStateAtom)

    return (
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
    )
}
