import {Request, Response} from "express"
import { ITourPackage } from "../types/dto/ITourPackage.dto"
import Package from "../models/Package"

export async function findPackageById(req: Request, res: Response) {
   const { _id } = req.params

   try {
     const tourPackage: ITourPackage | null = await Package.findById(_id)

     if (!tourPackage) {
       return res.status(404).json({ error: "Package not found" })
     }

     res.json(tourPackage)
   } catch (error) {
     console.error("Error finding package:", error)
     res.status(500).json({ error: "Internal server error" })
   }
}