import { getSectionList } from '../functions'
import { v4 as uuidv4 } from 'uuid'
import { useAtom } from 'jotai'
import { filterStateAtom, reviewNotesAtom } from '../../../atoms'


export const FilterSection = () => {

    const [reviewNotes, setReviewNotes] = useAtom(reviewNotesAtom)
    const [filterState, setFilterState] = useAtom(filterStateAtom)


    return (
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
        </form>)
}
