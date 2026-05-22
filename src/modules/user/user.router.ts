import { Router } from "express";
import app from "../../app";
import { pool } from "./../../db/index";
import { type Request, type Response } from "express";
import { userController } from "./user.controller";

const{ createUser } = userController
const router =Router()
{


    router.post('/', createUser)


};



//router ta ke export kore dibo jate onno jaygay use korte pari
export const userRouter = router;