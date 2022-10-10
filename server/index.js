import express from 'express'
import cors from 'cors'
const app = express()
const port = 8080

app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello from the server!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})