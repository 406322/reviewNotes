import { FilterState, ReviewNote, Users } from "../../models"


// ------------------------------------------
//  FILTER FUNCTIONS
// ------------------------------------------

export const filterRows = (filterState: FilterState, data: ReviewNote[]) => {
    let n = filterState.rows
    if (data.length < filterState.rows) n = data.length
    let result = []
    for (let i = 0; i < n; i++) {
        result.push(data[i])
    }
    return result
}

export const filterSearch = (filterState: FilterState, data: ReviewNote[], searchInput: string) => {
    if (filterState.search === "") return data
    const result = data.filter(value => {
        const searchStr = searchInput.toLowerCase()
        const matches = value.title.toLowerCase().includes(searchStr)
        return matches
    })
    return result
}

export const filterType = (data: ReviewNote[], type: string) => {
    if (type === 'All') return data
    else { return data.filter(x => x.type === type) }
}

export const filterPriority = (data: ReviewNote[], priority: string) => {
    if (priority === 'All') return data
    else { return data.filter(x => x.priority === priority) }
}

export const filterReporter = (users: Users[] | null, data: ReviewNote[], reporter: string) => {
    if (reporter === 'All') return data
    const name = reporter
    const user = users!.filter(x => x.name === name)
    const id = user[0].id
    return data.filter(x => x.reporter === id)
}

export const filterAssignees = (users: Users[] | null, data: ReviewNote[], assignees: string) => {
    if (assignees === 'All') return data
    const name = assignees
    const user = users!.filter(x => x.name === name)
    const id = user[0].id
    return data.filter(x => x.assignees === id)
}

export const filterSection = (data: ReviewNote[], section: string) => {
    if (section === 'All') return data
    if (section === 'Section not assigned') { return data.filter(x => x.section === null) }
    return data.filter(x => x.section === section)
}

export const filterDate = (data: ReviewNote[], date: string) => {
    if (date === "") return data
    return data.filter(x => x.dueDate === date)
}


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

export const getSectionList = (array: ReviewNote[]) => {
    const sectionList = array.map(note => { return note.section })
    let uniqueSectionList = [...new Set(sectionList)]
    const newArray = uniqueSectionList.map(note => {
        if (note === null) return 'Section not assigned'
        return note
    })
    return newArray
}