import express from 'express'
import cors from 'cors'
const app = express()
const port = 8080

import * as usersData from './data/dummy-data-users.json' assert {type: "json"}
import * as reviewnotesData from './data/dummy-data-reviewnotes.json' assert {type: "json"}

import { formatReviewNotesData } from './functions.js'

app.use(cors())

app.get('/users', (req, res) => {
    res.status(200).json(usersData.default)
})

app.get('/reviewnotes', (req, res) => {
    const result = formatReviewNotesData(reviewnotesData)
    res.status(200).json(result)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
