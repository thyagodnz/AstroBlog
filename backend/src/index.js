import express from 'express'
import routes from './routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDataBase from './config/database.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use(routes)

connectDataBase()
    .then(() => {
        app.listen(3000, () => console.log('Servidor e banco de dados conectados'))
    })
    .catch((error) => console.log(error))
