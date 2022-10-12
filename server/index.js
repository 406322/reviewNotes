import express from 'express'
import cors from 'cors'
const app = express()
const port = 8080

import * as usersData from './data/dummy-data-users.json' assert {type: "json"}
import * as reviewnotesData from './data/dummy-data-reviewnotes.json' assert {type: "json"}

app.use(cors())

const formatDate = (string) => {
    if (string.length === 24) { // "2021-09-14T06:02:49.781Z"
        const day = string.slice(8, 10)
        const month = string.slice(5, 7)
        const year = string.slice(0, 4)
        const hour = string.slice(11, 13)
        const minute = string.slice(14, 16)

        return day + '.' + month + '.' + year + ' ' + hour + ':' + minute
    } else { // "2021-09-16"
        const day = string.slice(8, 10)
        const month = string.slice(5, 7)
        const year = string.slice(0, 4)

        return day + '.' + month + '.' + year
    }
}

const formatSection = (string) => {
    if (string === "app-engagement-information") return "Engagement information"
    if (string === "app-independence") return "Independence"
    if (string === "app-scope") return "Scope"
    else return string
}

const formatReviewNotesData = (reviewnotesData) => {
    return reviewnotesData.default.map((element) => {
        return {
            title: element.title,
            ...(element.type === 'Task' ? { type: 'Task' } : { type: 'Note' }),
            status: element.status,
            priority: element.priority.text,
            dueDate: formatDate(element.dueDate),
            ...(element.assignees[0] ? { assignees: element.assignees[0].$oid } : { assignees: [] }),
            reporter: element.reporterId.$oid,
            section: formatSection(element.sectionRef),
            created: formatDate(element.createdAt.$date),
            updated: formatDate(element.updatedAt.$date),
        }
    })
}


app.get('/', (req, res) => {
    res.send('Hello from the server!')
})

app.get('/users', (req, res) => {
    res.status(200).json(usersData)
})

app.get('/reviewnotes', (req, res) => {
    const result = formatReviewNotesData(reviewnotesData)
    res.status(200).json(result)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
