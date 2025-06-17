import express from 'express'

// custom module imports
import config from './config/config.ts'
const app = express()

app.listen(config.PORT, () => {
    // console.log(`Server is running on http://localhost:${config.PORT}`)
})
