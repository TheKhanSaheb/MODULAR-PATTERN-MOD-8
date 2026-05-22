import e from "express";
import { pool } from "../../db"
import type { IUser } from "./user.interface";

const createUserIntoDB = async (payLoad:IUser) => {
    const { name, email, password, age } = payLoad;
    const result = await pool.query(
        'INSERT INTO users (name, email, password, age) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, email, password, age]
    );
    return result.rows[0];
};


const getAllUsersFromDB = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result;
};

const getUserByIdFromDB = async (userId: number) => {
     const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
           
    return result;
         
};

const updateUserByDB  = async (payLoad:IUser, userId: number)=>
{
        const { name, email, password, age } = payLoad
    const result = await
    
                pool.query(
                    `UPDATE users SET name = $1, email = $2, password = $3, age = $4 WHERE id = $5 RETURNING *`,
                    [name, email, password, age, userId]
                )
                return result;
}

const deleteUserByIdFromDB = async (userId: number) => {
     const result = await
            pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [userId])
            return result;
};
export const userService = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUserByIdFromDB,
    updateUserByDB,
    deleteUserByIdFromDB
}