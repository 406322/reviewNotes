import express from 'express'
import cors from 'cors'
const app = express()
const port = 8080

import * as users from './data/dummy-data-users.json' assert {type: "json"}
import * as reviewnotes from './data/dummy-data-reviewnotes.json' assert {type: "json"}

app.use(cors())


const fixData = (data) => {
    return data.default.map((element) => {
        return {
            title: element.title,
            type: element.type,
            status: element.status,
            priority: element.priority.text,
            dueDate: element.dueDate,
            ...(element.assignees[0] ? { assignees: element.assignees[0].$oid } : { assignees: [] }),
            reporter: element.reporterId.$oid,
            section: element.sectionRef,
            created: element.createdAt.$date,
            updated: element.updatedAt.$date,
        }
    })
}


app.get('/', (req, res) => {
    res.send('Hello from the server!')
})

app.get('/users', (req, res) => {
    res.status(200).json(users)
})

app.get('/reviewnotes', (req, res) => {
    const data = fixData(reviewnotes)
    res.status(200).json(data)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
