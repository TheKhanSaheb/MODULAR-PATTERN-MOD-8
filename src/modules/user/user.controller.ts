import type { Request, Response } from "express"
import { pool } from "../../db"
import { userService } from "./user.service"


const createUser =  async (req: Request, res: Response) => {
        const { name, email, password, age } = req.body
    
        try {
           //the user data will be inserted into the database using the pool.query method
           //and this is pasted on service.ts for better modularity and separation of concerns.
           const result = await userService.createUserIntoDB(req.body)
    
            res.status(200).json({
                message: 'User inserted successfully',
                data: result
            })
        } catch (error) {
            console.error('Error inserting user data:', error)
    
            res.status(500).json({
                error: 'Internal Server Error',
                data: error
            })
        }
    }

    export const userController = {
        createUser
    }