import {Request, Response, Router} from "express"
import userRoutes from "./user"
import packageRoutes from "./package"
import orderRoutes from "./order"
import locationRoutes from "./location"
const router = Router()

router.get("/", (req: Request, res: Response) => {
    res.send("This is the api root")
});

router.use("/user", userRoutes )
router.use("/package", packageRoutes)
router.use("/order", orderRoutes)
router.use("/location", locationRoutes)



export default router