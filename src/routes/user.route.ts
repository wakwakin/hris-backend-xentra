import { Hono } from 'hono'
import { userController } from '../controllers/user.controller'

const user = new Hono()

user.get('/users', userController.getUsers)

user.post('/user', userController.createUser)
user.get('/user/:id', userController.getUserDetails)
user.put('/user/:id', userController.updateUser)
user.patch('/user/:id', userController.updateUserStatus)

export default user
