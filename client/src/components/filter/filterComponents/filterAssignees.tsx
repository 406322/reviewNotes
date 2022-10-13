import { useAtom } from 'jotai'
import { filterStateAtom, usersAtom } from '../../../atoms'

export const FilterAssignees = () => {

    const [users, setUsers] = useAtom(usersAtom)
    const [filterState, setFilterState] = useAtom(filterStateAtom)

    return (
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
        </form>)
}
