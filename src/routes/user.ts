import {Router} from "express"
import { allUsers, findUserById } from "../controllers/user"
const router = Router()

router.get("/all", allUsers)
router.get("/:_id", findUserById)


export default router;
