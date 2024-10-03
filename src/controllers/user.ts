import express, { Request, Response } from "express"
import { CreateUserDto } from "../types/dto/CreateUser.dto"

//get

export function allUsers(req: Request, res: Response){
    res.send("Hello You Reached User Alan")
}
//get params
export function findUserById(req: Request, res: Response) {
    const {_id} = req.params

    res.send(`Here is the ID from the params ${_id}`)

}
//post
export function createUser(req: Request<{}, {},CreateUserDto>, res: Response){


    req.body.email

}