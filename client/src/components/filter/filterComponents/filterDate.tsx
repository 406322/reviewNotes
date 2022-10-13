import { useAtom } from 'jotai'
import { filterStateAtom } from '../../../atoms'

export const FilterDate = () => {

    const [filterState, setFilterState] = useAtom(filterStateAtom)

    return (
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
        </form>)
}
