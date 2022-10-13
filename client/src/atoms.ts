import { atom } from 'jotai'
import { ReviewNote } from './models'


export const usersAtom = atom(null)
export const reviewNotesAtom = atom<ReviewNote[] | null>(null)
export const filteredReviewNotesAtom = atom(null)
export const filterStateAtom = atom({
    rows: 3,
    search: "",
    type: "All",
    status: "All",
    priority: "All"
})
