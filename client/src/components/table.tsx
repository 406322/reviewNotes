import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { GrLink } from 'react-icons/gr'
import { useAtom } from 'jotai'
import { usersAtom, reviewNotesAtom, filteredReviewNotesAtom, filterStateAtom } from '../atoms'
import * as api from '../api'


export const Table = () => {

    const [users, setUsers] = useAtom(usersAtom)
    const [reviewNotes, setReviewNotes] = useAtom(reviewNotesAtom)
    const [filteredReviewNotes, setFilteredReviewNotes] = useAtom(filteredReviewNotesAtom)
    const [filterState, setFilterState] = useAtom(filterStateAtom)


    useEffect(() => {
        api.getUsers()
            .then((result) => setUsers(result))
        api.getReviewnotes()
            .then((result) => setReviewNotes(result))
    }, [])


    const handleLoadMore = () => {
        if (!reviewNotes) return
        const isMaxRows = (reviewNotes.length) <= filterState.rows
        if (isMaxRows) return
        setFilterState((prevState) => { return { ...prevState, rows: filterState.rows + 3 } })
    }

    const getPhoto = (element: string) => {
        if (!users) return
        const user = users.filter(user => user.id === element)
        const photo = user[0].photo
        return photo

    }

    const colNames = ["", "Title", "Type", "Status", "Priority", "Due date", "Assignees", "Reporter", "Section", "Created", "Updated"]

    return (

        <div>
            <div>
                {filteredReviewNotes && (

                    <table className='w-full border border-separate table-fixed border-spacing-2'>

                        <thead>
                            <tr className='text-left'>
                                {colNames.map((element) => {
                                    if (element === '') { return <th className='w-3' key={uuidv4()}>{element}</th> }
                                    if (element === 'Title') { return <th className='w-64 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Type') { return <th className='font-semibold w-14' key={uuidv4()}>{element}</th> }
                                    if (element === 'Status') { return <th className='w-48 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Priority') { return <th className='w-20 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Due date') { return <th className='w-20 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Assignees') { return <th className='w-20 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Reporter') { return <th className='w-20 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Section') { return <th className='w-48 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Created') { return <th className='w-32 font-semibold' key={uuidv4()}>{element}</th> }
                                    if (element === 'Updated') { return <th className='w-32 font-semibold' key={uuidv4()}>{element}</th> }

                                    return <th key={uuidv4()}>{element}</th>
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            {Object.values(filteredReviewNotes).map((obj) => (

                                <tr key={uuidv4()} >
                                    <td><input type="checkbox" /></td>

                                    {Object.values(obj).map((element, index) => {
                                        if (element === 'Note') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Task') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }

                                        if (element === 'In Progress') { return <td className='text-sm text-center text-white bg-blue-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Not started') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Addressed') { return <td className='text-sm text-center text-white bg-green-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Pending documentation') { return <td className='text-sm text-center text-white bg-yellow-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Closed') { return <td className='text-sm text-center text-white bg-black border border-black' key={index}>{element}</td> }

                                        if (element === 'Engagement information') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Independence') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Scope') { return <td className='text-sm text-center text-white bg-gray-500 border border-black' key={index}>{element}</td> }

                                        if (element === 'High') { return <td className='text-sm text-center text-white bg-red-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Medium') { return <td className='text-sm text-center text-white bg-yellow-500 border border-black' key={index}>{element}</td> }
                                        if (element === 'Low') { return <td className='text-sm text-center text-white bg-green-500 border border-black' key={index}>{element}</td> }

                                        if (element === '001') { return <td key={index}>{<img className='w-8 h-8 rounded-full' src={getPhoto(element)} title={element} alt={element} />}</td> }
                                        if (element === '002') { return <td key={index}>{<img className='w-8 h-8 rounded-full' src={getPhoto(element)} title={element} alt={element} />}</td> }

                                        return <td className='text-sm' key={uuidv4()}>{element}</td>

                                    })}

                                    <td><GrLink /></td>

                                </tr>
                            ))}

                        </tbody>
                    </table>
                )}

                <button
                    className='w-full text-blue-600 underline bg-blue-100 border border-black'
                    onClick={handleLoadMore}
                >
                    Load more
                </button>

            </div >
        </div>
    )
}
