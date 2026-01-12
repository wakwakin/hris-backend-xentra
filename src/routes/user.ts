import { Hono } from "hono"
import { User } from "../models/user.model"
import mongoose from "mongoose"

const user = new Hono()

// get all users
user.get("users", async (c) => {
  const users = await User.find()
  return c.json(users)
})

// get user details
user.get("user/:id", async (c) => {
  try {
    const id = c.req.param('id')
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return c.json({ error: "Invalid user ID" }, 400)
    }

    const user = await User.findById(id)
    if (!user) {
      return c.json({ error: "No user found" }, 404)
    }

    return c.json(user)
  } catch (err) {
    console.error(err)
    return c.json({ error: "Server error" }, 500)
  }
})

// create user
user.post("user", async (c) => {
  try {
    const body = await c.req.json()
    if (!body.name || !body.email) {
      return c.json({ error: "Name and email are required" }, 400)
    }

    const email = await User.findOne({ email: body.email })
    if (email) {
      return c.json({ error: "Existing email" }, 409)
    }

    const newUser = new User({
      name: body.name,
      email: body.email
    })

    newUser.save()
    return c.json(newUser)
  } catch (err) {
    console.error(err)
    return c.json({ error: "Server error" }, 500)
  }
})

// update user
user.put("user/:id", async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    const { name, email } = body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return c.json({ error: "Invalid user ID" }, 400)
    }

    const user = await User.findById(id)
    if (!user) {
      return c.json({ error: "User not found" }, 404)
    }

    if (email && email !== user.email) {
      const used = await User.findOne({ email })
      if (used) {
        return c.json({ error: "Email already in use" }, 409)
      }
    }

    if (name) user.name = name
    if (email) user.email = email

    await user.save()
    return c.json(user)
  } catch (err) {
    console.error(err)
    return c.json({ error: "Server error" }, 500)
  }
})

export default user