import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { reviewNotesAtom, filteredReviewNotesAtom, filterStateAtom, usersAtom } from '../../atoms'
import { ReviewNote } from '../../models'

import {
    filterAssignees,
    filterDate,
    filterPriority,
    filterReporter,
    filterRows,
    filterSearch,
    filterSection,
    filterStatus,
    filterType,
} from './functions'

import { FilterSearch } from './filterComponents/filterSearch'
import { FilterType } from './filterComponents/filterType'
import { FilterPriority } from './filterComponents/filterPriority'
import { FilterReporter } from './filterComponents/filterReporter'
import { FilterAssignees } from './filterComponents/filterAssignees'
import { FilterSection } from './filterComponents/filterSection'
import { FilterDate } from './filterComponents/filterDate'


export const Filter = () => {

    const [users, setUsers] = useAtom(usersAtom)
    const [reviewNotes, setReviewNotes] = useAtom(reviewNotesAtom)
    const [filteredReviewNotes, setFilteredReviewNotes] = useAtom(filteredReviewNotesAtom)
    const [filterState, setFilterState] = useAtom(filterStateAtom)

    useEffect(() => {
        if (reviewNotes) runFilter(reviewNotes)
    }, [reviewNotes, filterState])

    const runFilter = (data: ReviewNote[]) => {
        let result = filterSearch(filterState, data, filterState.search)
        result = filterType(result!, filterState.type)
        result = filterStatus(result, filterState.status)
        result = filterPriority(result, filterState.priority)
        result = filterReporter(users, result, filterState.reporter)
        result = filterAssignees(users, result, filterState.assignees)
        result = filterSection(result, filterState.section)
        result = filterDate(result, filterState.date)
        result = filterRows(filterState, result)
        setFilteredReviewNotes(result)
    }

    return (
        <div
            id="filterBar"
            className='flex gap-6 my-5'>

            <FilterSearch />

            <FilterType />

            <FilterPriority />

            <FilterReporter />

            <FilterAssignees />

            <FilterSection />

            <FilterDate />

        </div>
    )
}
