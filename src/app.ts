import express, { type Application, type Request, type Response } from 'express'
import { initDB, pool } from './db'
import { userRouter } from './modules/user/user.router'

const app: Application = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.text())


// pool and initdb are cut and pasted to db , index.ts for better modularity and separation of concerns.


//user router ke app er sathe use kore dibo
app.use('/api/users', userRouter)


// Home route
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running')
})
// GET route to fetch all users
app.get('/api/users', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`SELECT * FROM users`)
        res.status(200).json({
            message: 'Users fetched successfully',
            data: result.rows
        })






    }
   
   
   
    catch (error) {
        console.error('Error fetching users:', error)
        res.status(500).json({
            error: 'Internal Server Error',
            data: error
        })
    }


})

app.get('/api/users/:id', async (req: Request, res: Response) => {
    const userId = req.params.id

    try {
        const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])
        res.status(200).json({
            message: 'User fetched successfully',
            data: result.rows[0]
        })

        if (result.rows.length === 0) {
            res.status(404).json({
                error: 'User not found'
            })
        }


    } catch (error) {
        console.error('Error fetching user:', error)
        res.status(500).json({
            error: 'Internal Server Error',
            data: error
        })
    }
})

// POST route

//UPDATE route
app.put('/api/users/:id', async (req: Request, res: Response) => {
    const userId = req.params.id
    const { name, email, password, age } = req.body

    try {
        const result = await

            pool.query(
                `UPDATE users SET name = $1, email = $2, password = $3, age = $4 WHERE id = $5 RETURNING *`,
                [name, email, password, age, userId]
            )
        res.status(200).json({
            message: 'User updated successfully',
            data: result.rows[0]
        })

        if (result.rows.length === 0) {
            res.status(404).json({
                error: 'User not found'
            })

        }
    } catch (error) {
        console.error('Error updating user:', error)
        res.status(500).json({
            error: 'Internal Server Error',
            data: error
        })
    }
})

app.delete('/api/users/:id', async (req: Request, res: Response) => {
    const userId = req.params.id
    try {
        const result = await
            pool.query(`DELETE FROM users WHERE id = $1 RETURNING *`, [userId])
        res.status(200).json({
            message: 'User deleted successfully',
            data: result.rows[0]
        })
        if (result.rows.length === 0) {
            res.status(404).json({
                error: 'User not found'
            })
        }
    } catch (error) {
        console.error('Error deleting user:', error)
        res.status(500).json({
            error: 'Internal Server Error',
            data: error
        })
    }
})






// Start server


export default app;