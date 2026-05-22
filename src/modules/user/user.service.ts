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

export const userService = {
    createUserIntoDB
}