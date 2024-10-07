import {Router, RequestHandler} from "express"
import { allUsers, createUser, findUserById } from "../controllers/user"
import { login, register } from "../controllers/auth"
const router = Router()

router.post("/auth/register", register as RequestHandler);
router.post("/auth/login", login as RequestHandler);

export default router;
