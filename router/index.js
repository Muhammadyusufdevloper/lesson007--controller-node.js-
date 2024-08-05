import express from "express"
import BlogsController from "../controller/blogs.js"
import UsersController from "../controller/users.js"
import AdminsController from "../controller/admins.js"
import OwnersController from "../controller/admins.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.get("/api/blogs", [auth], BlogsController.get)
router.get("/api/blogs/:id", BlogsController.getById)
router.post("/api/blogs", BlogsController.post)
router.delete("/api/blogs/:id", BlogsController.delete)
router.put("/api/blogs/:id", BlogsController.put)

router.get("/api/users", UsersController.get)
router.post("/api/users", UsersController.post)
router.delete("/api/users/:id", UsersController.delete)
router.put("/api/users/:id", UsersController.put)

router.get("/api/admins", AdminsController.signUp)
router.post("/api/admins", AdminsController.signIn)

router.get("/api/owner", OwnersController.signUp)
router.post("/api/owner", OwnersController.signIn)

export default router