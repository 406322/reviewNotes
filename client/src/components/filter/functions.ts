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
    if (type === 'All') { return data.filter(x => x === x) }
    else { return data.filter(x => x.type === type) }
}

export const filterStatus = (data: ReviewNote[], status: string) => {
    if (!data) return data
    if (status === 'All') { return data.filter(x => x === x) }
    else { return data.filter(x => x.status === status) }
}

export const filterPriority = (data: ReviewNote[], priority: string) => {
    if (!data) return data
    if (priority === 'All') { return data.filter(x => x === x) }
    else { return data.filter(x => x.priority === priority) }
}

export const filterReporter = (users: Users[] | null, data: ReviewNote[], reporter: string) => {
    if (!data) return data
    if (reporter === 'All') { return data.filter(x => x === x) }
    const name = reporter
    const user = users!.filter(x => x.name === name)
    const id = user[0].id
    const result = data.filter(x => x.reporter === id)
    return result
}

export const filterAssignees = (users: Users[] | null, data: ReviewNote[], assignees: string) => {
    if (!data) return data
    if (assignees === 'All') { return data.filter(x => x === x) }
    const name = assignees
    const user = users!.filter(x => x.name === name)
    const id = user[0].id
    const result = data.filter(x => x.assignees === id)
    return result
}

export const filterSection = (data: ReviewNote[], section: string) => {
    if (!data) return data
    if (section === 'All') { return data.filter(x => x === x) }
    if (section === 'Section not assigned') { return data.filter(x => x.section === null) }
    const result = data.filter(x => x.section === section)
    return result
}

export const filterDate = (data: ReviewNote[], date: string) => {
    if (!data) return data
    if (date === "") return data
    const result = data.filter(x => x.dueDate === date)
    return result
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