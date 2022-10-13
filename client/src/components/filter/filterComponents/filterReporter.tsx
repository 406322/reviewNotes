import { useAtom } from "jotai"
import { filterStateAtom, usersAtom } from "../../../atoms"

export const FilterReporter = () => {

    const [users, setUsers] = useAtom(usersAtom)
    const [filterState, setFilterState] = useAtom(filterStateAtom)

    return (
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
    )
}
