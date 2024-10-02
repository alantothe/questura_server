import {Request, Response, Router} from "express"
import userRoutes from "./user"

const router = Router()

router.get("/", (req: Request, res: Response) => {
    res.send("This is the api root")
});

router.use("/user", userRoutes )


export default router