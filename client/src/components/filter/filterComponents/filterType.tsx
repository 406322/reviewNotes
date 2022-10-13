import { useAtom } from 'jotai'
import { filterStateAtom } from '../../../atoms'

export const FilterType = () => {

    const [filterState, setFilterState] = useAtom(filterStateAtom)

    return (
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
    )
}
