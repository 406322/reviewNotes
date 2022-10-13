import { atom } from 'jotai'
import { ReviewNote, Users, FilterState } from './models'

export const usersAtom = atom<Users[] | null>(null)
export const reviewNotesAtom = atom<ReviewNote[] | null>(null)
export const filteredReviewNotesAtom = atom<ReviewNote[] | null>(null)
export const filterStateAtom = atom<FilterState>({
    rows: 3,
    search: "",
    type: "All",
    status: "All",
    priority: "All",
    reporter: "All",
    assignees: "All",
    section: "All",
})
