import {Router} from "express"
import { allUsers, createUser, findUserById } from "../controllers/user"
const router = Router()

router.get("/all", allUsers)
router.get("/:_id", findUserById)
router.post("/register", createUser)


export default router;
