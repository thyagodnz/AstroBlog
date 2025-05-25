import express from 'express'
import routes from './routes.js'
import cors from 'cors'
import connectDataBase from './database/db.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json())
app.use(routes)

connectDataBase()
    .then(() => {
        app.listen(3000, () => console.log('Servidor e banco de dados conectados'))
    })
    .catch((error) => console.log(error))
