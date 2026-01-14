import { User } from '../models/user.model'
import { getPagination } from '../utils/pagination'

const ALLOWED_STATUSES = ['ACTIVE', 'INACTIVE'] as const
type UserStatus = (typeof ALLOWED_STATUSES)[number]

export const userService = {
  getUsersPaginated: async (page: number, limit: number) => {
    const {
      skip,
      limit: safeLimit,
      page: safePage,
    } = getPagination(page, limit)

    const [users, total] = await Promise.all([
      User.find().skip(skip).limit(safeLimit).sort({ createdAt: -1 }),
      User.countDocuments(),
    ])

    return {
      users,
      total,
      page: safePage,
      limit: safeLimit,
    }
  },
  getUserById: async (id: string) => {
    return User.findById(id)
  },
  getUserByEmail: async (email: string) => {
    return User.findOne({ email })
  },
  uniqueEmail: async (email: string, excludeUserId?: string) => {
    const query: any = { email }
    if (excludeUserId) query._id = { $ne: excludeUserId }

    const existing = await User.findOne(query)
    if (existing) {
      throw new Error('EMAIL_EXISTS')
    }
  },
  createUser: async (data: { name: string; email: string }) => {
    await userService.uniqueEmail(data.email)
    return new User(data).save()
  },
  updateUser: async (id: string, data: { name?: string; email?: string }) => {
    const user = await userService.getUserById(id)
    if (!user) return null

    if (data.email && data.email !== user.email) {
      await userService.uniqueEmail(data.email, id)
    }

    Object.assign(user, data)
    return user.save()
  },
  updateUserStatus: async (id: string, status: UserStatus) => {
    const user = await User.findById(id)
    if (!user) return null

    if (!ALLOWED_STATUSES.includes(status)) {
      throw new Error('INVALID_STATUS')
    }

    user.status = status
    return user.save()
  },
}
