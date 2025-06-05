import { Router } from 'express'
import { UserController, NewsController } from './controllers/index.js'
import upload from './middlewares/upload.js'

const routes = Router()

routes.get('/users', UserController.getUsers)
routes.get('/users/:id', UserController.getUserById)
routes.post('/users', UserController.createUser)
routes.post('/login', UserController.loginUser)
routes.put('/users/:id', UserController.updateUser)
routes.delete('/users/:id', UserController.deleteUser)

routes.get('/news', NewsController.getNews)
routes.get('/news/:id', NewsController.getNewsById)
routes.get('/news/author/:author', NewsController.getNewsByAuthor)
routes.post('/news', upload.single('image'), NewsController.createNews)
routes.put('/news/:id', NewsController.updateNews)
routes.delete('/news/:id', NewsController.deleteNews)

routes.post('/news/:id/comments', NewsController.addComment)
routes.delete('/news/:newsId/comments/:commentId', NewsController.deleteComment)

export default routes
