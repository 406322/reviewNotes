import { atom } from 'jotai'


export const usersAtom = atom(null)
export const reviewNotesAtom = atom(null)
export const filteredReviewNotesAtom = atom(null)
export const filterStateAtom = atom({
    rows: 3,
    search: "",
    type: "All",
    status: "All",
    priority: "All"
})
