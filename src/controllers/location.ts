import { Request, Response } from "express"
import Location from "../models/Locations"

export async function findLocationByName(req: Request, res: Response) {
    const { name } = req.params

    try {
        const location: Location | null = await Location.findOne({ country: name })

        if (!location) {
            return res.status(404).json({ error: "Location not found" })
        }

        res.json(location)
    } catch (error) {
        console.error("Error finding location:", error)
    }
}
