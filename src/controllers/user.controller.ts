import { Context } from 'hono'
import mongoose from 'mongoose'
import { userService } from '../services/user.service'

export const userController = {
  getUsers: async (c: Context) => {
    try {
      const page = Number(c.req.query('page') ?? 1)
      const limit = Number(c.req.query('limit') ?? 10)

      if (page < 1 || limit <= 0) {
        return c.json({ error: 'Invalid page or limit' }, 400)
      }

      const result = await userService.getUsersPaginated(page, limit)

      return c.json({
        data: result.users,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
        },
      })
    } catch (err) {
      console.error(err)
      return c.json({ error: 'Server error' }, 500)
    }
  },
  getUserDetails: async (c: Context) => {
    try {
      const id = c.req.param('id')
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return c.json({ error: 'Invalid user ID' }, 400)
      }

      const user = await userService.getUserById(id)
      if (!user) {
        return c.json({ error: 'No user found' }, 404)
      }

      return c.json(user)
    } catch (err) {
      console.error(err)
      return c.json({ error: 'Server error' }, 500)
    }
  },
  createUser: async (c: Context) => {
    try {
      const body = await c.req.json()
      if (!body.name || !body.email) {
        return c.json({ error: 'Name and email are required' }, 400)
      }

      const user = await userService.createUser({
        name: body.name,
        email: body.email,
      })

      return c.json(user)
    } catch (err: any) {
      if (err.message === 'EMAIL_EXISTS') {
        return c.json({ error: 'Existing email' }, 409)
      }
      console.error(err)
      return c.json({ error: 'Server error' }, 500)
    }
  },
  updateUser: async (c: Context) => {
    try {
      const id = c.req.param('id')
      const body = await c.req.json()
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return c.json({ error: 'Invalid user ID' }, 400)
      }

      const updatedUser = await userService.updateUser(id, {
        name: body.name,
        email: body.email,
      })
      if (!updatedUser) {
        return c.json({ error: 'User not found' }, 404)
      }

      return c.json(updatedUser)
    } catch (err: any) {
      if (err.message === 'EMAIL_EXISTS') {
        return c.json({ error: 'Email already in use' }, 409)
      }
      console.error(err)
      return c.json({ error: 'Server error' }, 500)
    }
  },
  updateUserStatus: async (c: Context) => {
    try {
      const id = c.req.param('id')
      const { status } = await c.req.json()

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return c.json({ error: 'Invalid user ID' }, 400)
      }

      if (!status) {
        return c.json({ error: 'Status is required' }, 400)
      }

      const user = await userService.updateUserStatus(id, status)

      if (!user) {
        return c.json({ error: 'User not found' }, 404)
      }

      return c.json(user)
    } catch (err: any) {
      if (err.message === 'INVALID_STATUS') {
        return c.json({ error: 'Invalid status value' }, 400)
      }

      console.error(err)
      return c.json({ error: 'Server error' }, 500)
    }
  },
}
