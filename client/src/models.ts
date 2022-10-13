
export interface ReviewNote {
    title: string,
    type: string,
    status: string,
    priority: string,
    dueDate: string,
    assignees: string,
    reporter: string,
    section: string,
    created: string,
    updated: string
}

export interface Users {
    id: string,
    name: string,
    photo: string
}

export interface FilterState {
    rows: number,
    search: string,
    type: string,
    status: string
    priority: string,
    reporter: string,
    assignees: string,
    section: string,
    date: string
}