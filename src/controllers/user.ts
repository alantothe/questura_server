import express, { Request, Response } from "express"

export function allUsers(req: Request, res: Response){
    res.send("Hello You Reached User Alan")
}

export function findUserById(req: Request, res: Response) {
    const {_id} = req.params

    res.send(`Here is the ID from the params ${_id}`)

}