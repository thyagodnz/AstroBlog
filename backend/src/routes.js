import { Router } from 'express'
import { getUsers, createUser, deleteUser, updateUser, loginUser, getUserById } from './controllers/UserController.js'
import { getNews, createNews, deleteNews, updateNews, getNewsById, addComment, deleteComment } from './controllers/NewsController.js'

const routes = Router()

routes.get('/users', getUsers)
routes.get('/users/:id', getUserById)
routes.post('/users', createUser)
routes.post('/login', loginUser)
routes.put('/users/:id', updateUser)
routes.delete('/users/:id', deleteUser)

routes.get('/news', getNews)
routes.get('/news/:id', getNewsById)
routes.post('/news', createNews)
routes.post('/news/:id/comments', addComment)
routes.put('/news/:id', updateNews)
routes.delete('/news/:id', deleteNews)
routes.delete('/news/:newsId/comments/:commentId', deleteComment)

export default routes
